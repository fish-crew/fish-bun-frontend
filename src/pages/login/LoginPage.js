import React, { useEffect } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../api/cookie";

function LoginPage() {
  const navigate = useNavigate();
  const accessToken = getCookie();

  useEffect(() => {
    if (accessToken) {
      navigate("/main", { replace: true });
    }
  }, [accessToken, navigate]);

  return (
    <div
      className="main-area flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(/assets/webp/loginIllustWithoutBun.webp)`,
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
            src="/assets/webp/kakao_login_large_wide.webp"
            alt="카카오 로그인 버튼"
            className="w-full h-full object-cover"
          />
        </a>
      </button>
    </div>
  );
}

export default LoginPage;
