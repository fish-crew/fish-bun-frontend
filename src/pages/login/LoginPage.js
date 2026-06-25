import React, { useEffect } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../api/cookie";
import { KAKAO_LOGIN_URL } from "../../config/env";

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
      className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(/assets/webp/loginIllustWithoutBun.webp)`,
      }}
    >
      <div
        className={`w-full absolute top-0 w-[88%] absolute ${styles.objectMoving}`}
      >
        <img src="/assets/webp/loginIllustBun.webp" alt="bulb bottom" />
      </div>

      <button className="flex justify-center absolute bottom-[15%] w-[80%] drop-shadow-smGray">
        <a href={KAKAO_LOGIN_URL}>
          <img
            src="/assets/webp/kakao_login_large_wide.webp"
            alt="kakao login button"
            className="w-full h-full object-cover"
          />
        </a>
      </button>
    </div>
  );
}

export default LoginPage;
