import { useEffect, useRef } from "react";

const ImageConfetti = ({ isActive, imageUrls }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (!isActive || imageUrls.length === 0) return;

    // 기존 canvas 제거 (중복 실행 방지)
    if (canvasRef.current && document.body.contains(canvasRef.current)) {
      document.body.removeChild(canvasRef.current);
    }

    // 새로운 canvas 생성
    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    const ctx = canvas.getContext("2d");

    // 기존 애니메이션 중단
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // 이미지 미리 로드
    imagesRef.current = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    // 이미지 로드 완료 후 실행
    Promise.all(
      imagesRef.current.map((img) => new Promise((res) => (img.onload = res)))
    ).then(() => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2.5;

      particles.current = [];
      for (let i = 0; i < 20; i++) {
        const img =
          imagesRef.current[
            Math.floor(Math.random() * imagesRef.current.length)
          ];
        particles.current.push({
          x: centerX,
          y: centerY,
          size: Math.random() * 40 + 30,
          speedX: (Math.random() - 0.5) * 10,
          speedY: (Math.random() - 0.5) * 12,
          gravity: Math.random() * 0.5 + 0.05,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 5,
          opacity: 1,
          image: img,
        });
      }

      const duration = 3000;
      const startTime = performance.now();

      const animate = (time) => {
        const elapsedTime = time - startTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.current.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;
          p.opacity = Math.max(0, 1 - elapsedTime / duration);
          // p.speedY += p.gravity;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.drawImage(p.image, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        if (elapsedTime < duration) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          if (canvas && document.body.contains(canvas)) {
            document.body.removeChild(canvas);
          }
          particles.current = [];
          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (canvas && document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
      particles.current = [];
    };
  }, [isActive, imageUrls]);

  return null;
};

export default ImageConfetti;
