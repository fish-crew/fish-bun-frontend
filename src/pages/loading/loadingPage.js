import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loadingIllust from "../../assets/loadingIllust.jpg";

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후에 /loginPage로 이동
    const timer = setTimeout(() => {
      navigate("/loginPage");
    }, 1500);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loadingIllust})` }}
    ></div>
  );
}

export default LoadingPage;
