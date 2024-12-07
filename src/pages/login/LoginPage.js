import kakaoLoginImg from "../../assets/kakao_login_large_wide.png";
import loginIllust from "../../assets/loginIllust.png";
import diaryFrameTop from "../../assets/diaryFrameTop.png";
import logoImg from "../../assets/logoImg.png";

function Login() {
  return (
    <div className="flex flex-col justify-between h-full items-center">
      <img
        src={diaryFrameTop}
        alt="붕어빵 탐험대 로고"
        className="pt-[3dvh] w-full"
      />
      <div className="w-[70%] flex flex-col flex-grow justify-around">
        <div></div>
        <div className="flex flex-col justify-center">
          <img src={logoImg} alt="붕어빵 탐험대 로고" className="" />
          <img src={loginIllust} alt="로그인 페이지 일러스트" className="" />
        </div>
        <button className="rflex justify-center">
          <img
            src={kakaoLoginImg}
            alt="카카오 로그인 버튼"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
      <img
        src={diaryFrameTop}
        alt="붕어빵 탐험대 로고"
        className="pb-[3dvh] w-full"
      />
    </div>
  );
}

export default Login;
