import React from "react";

function LoginPage() {
  return (
    <div
      className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(/assets/webp/loginIllust.webp)`, // WebP 배경 이미지
      }}
    >
      <button className="flex justify-center absolute bottom-[15%] w-[80%] drop-shadow-smGray">
        <a href="/api/oauth2/authorization/kakao">
          <img
            src="/assets/webp/kakao_login_large_wide.webp" // WebP 카카오 로그인 버튼
            alt="카카오 로그인 버튼"
            className="w-full h-full object-cover"
          />
        </a>
      </button>
    </div>
  );
}

export default LoginPage;
