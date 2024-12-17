import React from "react";
import kakaoLoginImg from "../../assets/kakao_login_large_wide.png";

function LoginPage() {
  // WebP 지원 여부 확인
  const isWebPSupported = document.documentElement.classList.contains("webp");

  // 배경 이미지 경로 설정
  const backgroundImage = isWebPSupported
    ? "/assets/webp/loginIllust.webp" // WebP 지원 시
    : require("../../assets/loginIllust.png"); // PNG 사용 시

  return (
    <div
      className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <button className="flex justify-center absolute bottom-[15%] w-[80%] drop-shadow-smGray">
        <a href="/api/oauth2/authorization/kakao">
          <img
            src={kakaoLoginImg}
            alt="카카오 로그인 버튼"
            className="w-full h-full object-cover"
          />
        </a>
      </button>
    </div>
  );
}

export default LoginPage;
