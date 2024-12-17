import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingIllust from "../../assets/loadingIllust.jpg";

// 이미지 목록 반환
const getImageList = (isWebPSupported) => {
  return isWebPSupported
    ? [
        "/assets/webp/loginIllust.webp",
        "/assets/webp/bg-paperptexture-wh.webp",
        "/assets/webp/bg-paperptexture.webp",
        "/assets/webp/bulbBtm.webp",
        "/assets/webp/bulbFull.webp",
        "/assets/webp/bun-frame.webp",
        "/assets/webp/checkPattern.webp",
        "/assets/webp/glitter.webp",
        "/assets/webp/paperOnCheck.webp",
        "/assets/webp/paperOnBlueCheckT.webp",
        "/assets/webp/paperOnCheckT.webp",
        "/assets/webp/paperOnCheckB.webp",
      ]
    : [
        "../../assets/loginIllust.png",
        "../../assets/bg-paperptexture-wh.png",
        "../../assets/bg-paperptexture.png",
        "../../assets/bulbBtm.png",
        "../../assets/bulbFull.png",
        "../../assets/bun-frame.png",
        "../../assets/checkPattern.png",
        "../../assets/glitter.png",
        "../../assets/paperOnCheck.png",
        "../../assets/paperOnBlueCheckT.png",
        "../../assets/paperOnCheckT.png",
        "../../assets/paperOnCheckB.png",
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

function LoadingPage({ isWebPSupported }) {
  const navigate = useNavigate();

  useEffect(() => {
    const images = getImageList(isWebPSupported);
    const minimumDelay = new Promise(
      (resolve) => setTimeout(resolve, 1500) // 최소 1.5초 유지
    );

    Promise.all([preloadImages(images), minimumDelay])
      .then(() => {
        navigate("/loginPage");
      })
      .catch((error) => {
        console.error("Error preloading images:", error);
        navigate("/loginPage");
      });
  }, [isWebPSupported, navigate]);

  return (
    <div
      className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loadingIllust})` }}
    ></div>
  );
}

export default LoadingPage;
