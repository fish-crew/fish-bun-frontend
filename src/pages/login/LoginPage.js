import React from "react";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div
      className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(/assets/webp/loginIllustWithoutBun.webp)`, // WebP 배경 이미지
      }}
    >
      <div
        className={`w-full absolute top-0 w-[88%] absolute ${styles["objectMoving"]}`}
      >
        <img src="/assets/webp/loginIllustBun.webp" alt="bulb bottom" />
      </div>

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
