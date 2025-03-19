import { useEffect, useRef } from "react";

const ImageConfetti = ({ isActive, imageUrl }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationRef = useRef(null); // 애니메이션 ID 저장

  useEffect(() => {
    if (!isActive) return;

    // 기존 canvas 삭제 (중복 실행 방지)
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

    // 이미지 로드
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 4;

      // 기존 파티클 배열 초기화 (이전 효과 삭제)
      particles.current = [];

      for (let i = 0; i < 15; i++) {
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
          p.speedY += p.gravity;
          p.rotation += p.rotationSpeed;
          p.opacity = Math.max(0, 1 - elapsedTime / duration);

          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
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
    };

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (canvas && document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
      particles.current = [];
    };
  }, [isActive, imageUrl]);

  return null;
};

export default ImageConfetti;
