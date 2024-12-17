import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 우선 로드 이미지
const bgBlue = "/assets/webp/bgBlue.webp";

// 이미지 목록 반환
const getImageList = () => {
  return [
    "/assets/webp/bgBlue.webp",
    "/assets/webp/logo.webp",
    "/assets/webp/cat.webp",
    "/assets/webp/stars.webp",
    "/assets/webp/loginIllust.webp",
    "/assets/webp/bulbBtm.webp",
    "/assets/webp/bulbFull.webp",
    "/assets/webp/bun-frame.webp",
    "/assets/webp/checkPattern.webp",
    "/assets/webp/glitter.webp",
    "/assets/webp/paperOnCheck.webp",
    "/assets/webp/paperOnBlueCheckT.webp",
    "/assets/webp/paperOnCheckT.webp",
    "/assets/webp/paperOnCheckB.webp",
  ];
};

// 이미지 미리 로드 함수
const preloadImages = (images) => {
  return Promise.all(
    images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
};

// 단일 이미지 우선 로드 함수
const preloadSingleImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve;
  });
};

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const images = getImageList();
    const minimumDelay = new Promise((resolve) => setTimeout(resolve, 2000)); // 최소 2초 유지

    // 1. bgBlue 우선 로드
    preloadSingleImage(bgBlue)
      .then(() => {
        // 2. 나머지 이미지 비동기 로드
        return Promise.all([preloadImages(images), minimumDelay]);
      })
      .then(() => {
        console.log("All images loaded successfully!");
        navigate("/loginPage"); // 페이지 이동
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        navigate("/loginPage");
      });
  }, [navigate]);

  return (
    <div
      className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgBlue})`,
      }}
    >
      <div className="w-full absolute top-[12%] px-14">
        <img
          src="/assets/webp/logo.webp"
          alt="붕어빵 탐험대 로고"
          className="animate__animated animate__bounceInUp"
        />
      </div>
      <div
        className="w-[70%] absolute"
        style={{
          top: "55%",
          left: "53%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <img
          src="/assets/webp/cat.webp"
          alt="고양이"
          className="animate__animated animate__bounceInUp"
        />
      </div>
      <div
        className="w-[88%] absolute animate__animated animate__fadeIn animate__delay-1s"
        style={{
          top: "52%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <img src="/assets/webp/stars.webp" alt="별" />
      </div>
    </div>
  );
}

export default LoadingPage;
