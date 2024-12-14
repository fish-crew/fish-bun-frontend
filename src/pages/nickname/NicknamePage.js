import React, { useState } from "react";
import paperOnCheckT from "../../assets/paperOnBlueCheckT.jpg";
import paperOnCheckB from "../../assets/paperOnCheckB.jpg";
import style from "./NicknamePage.module.css"; // 올바른 import

function NicknamePage() {
  const [nickname, setNickname] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;

    // 최대 길이 초과 시 alert
    if (value.length > 7) {
      alert("닉네임은 공백 포함 최대 7글자까지 입력할 수 있습니다.");
      return;
    }

    setNickname(value); // 상태 업데이트
  };

  // 서버로 보내기
  const handleSubmit = () => {
    // 입력값이 공란인지 확인
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 입력값이 정상인 경우 처리
    // 서버 요청 로직 추가
    alert("입력 값 제출(api 연결 후 삭제)");
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="w-full h-max">
        <img src={paperOnCheckT} alt="상단 배너" />
      </div>

      <div
        className="w-full flex flex-col flex-grow justify-around bg-cover whitespace-nowrap p-6 items-center"
        style={{ backgroundImage: `url(${paperOnCheckB})` }}
      >
        <div className="w-full">
          <input
            type="text"
            className={`${style["custom-input"]} w-72 text-title py-2`}
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={handleInputChange}
            maxLength={7}
          />
          <div className="pt-1 text-gray-700">
            닉네임은 7글자 이내로 작성해주세요.
          </div>
        </div>

        <button
          className="mt-4 bg-[#505985] hover:text-[#505985] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
          onClick={handleSubmit}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default NicknamePage;
