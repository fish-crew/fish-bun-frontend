import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./NicknamePage.module.css";

import { postNickNameAddData } from "../../api/service.js";

function NicknamePage() {
  const navigate = useNavigate();

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
  const handleSubmit = async () => {
    // 입력값이 공란인지 확인
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 입력값이 정상인 경우 처리
    // 서버 요청 로직 추가
    try {
      // 서버에 데이터 전송
      const response = await postNickNameAddData(nickname);
      console.log("서버 응답:", response);

      // 서버 응답에 따라 처리
      alert("닉네임이 성공적으로 등록되었습니다!");
    } catch (error) {
      console.error("데이터 전송 실패:", error);
      alert("서버로 데이터를 전송하는 데 실패했습니다.");
    }

    navigate("/main");
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="w-full h-max">
        <img src="/assets/webp/paperOnBlueCheckT.webp" alt="상단 배너" />
      </div>

      <div
        className="w-full flex flex-col flex-grow justify-around bg-cover whitespace-nowrap p-6 items-center"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}
      >
        <div className="w-full">
          <input
            type="text"
            className={`${style["custom-input"]} w-72 text-sz40 py-2`}
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
          className="mt-4 bg-[#505985] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
          onClick={handleSubmit}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default NicknamePage;
