import kakaoLoginImg from "../../assets/kakao_login_large_wide.png";
import loginIllust from "../../assets/loginIllust.png";

function Login() {
  return (
    <div
      className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loginIllust})` }}
    >
      <button className="flex justify-center absolute bottom-[15%] w-[80%] drop-shadow-smGray">
        <img
          src={kakaoLoginImg}
          alt="카카오 로그인 버튼"
          className="h-full object-cover"
        />
      </button>
    </div>
  );
}

export default Login;
