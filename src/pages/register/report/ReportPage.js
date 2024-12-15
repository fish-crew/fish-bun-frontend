import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import paperOnCheckB from "../../../assets/paperOnCheckB.jpg";
import paperOnCheckT from "../../../assets/paperOnCheckT.jpg";
import diaryLine from "../../../assets/diaryLine.png";

function ReportPage() {
  const navigate = useNavigate();
  const [newBungeobbangsName, setnewBungeobbangsName] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setnewBungeobbangsName(value); // 상태 업데이트
  };

  // 서버로 보내기
  const handleSubmit = () => {
    // 입력값이 공란인지 확인
    if (!newBungeobbangsName.trim()) {
      alert("뿡어빵의 이름을 입력해주세요.");
      return;
    }

    // 입력값이 정상인 경우 처리
    // 서버 요청 로직 추가

    //메인 페이지로 네비게이트
    alert("제보가 완료되었습니다.\n감사합니다.");
    navigate("/main");
  };

  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate("/main");
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="w-full h-max">
        <img src={paperOnCheckT} alt="상단 배너" />
      </div>
      <div
        className="w-full flex flex-col flex-grow justify-around bg-cover whitespace-nowrap p-6 items-center relative"
        style={{ backgroundImage: `url(${paperOnCheckB})` }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-[#650000] hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white stroke-[3px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-full">
          <input
            type="text"
            name="newBungeobbangsName"
            placeholder="뿡어빵 이름을 입력하세요."
            onChange={handleInputChange}
            className="text-sz40 bg-transparent outline-none w-80 py-2"
            style={{
              border: "none",
              borderBottom: "2px solid transparent",
              backgroundImage: `url(${diaryLine})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom left",
              backgroundSize: "100% auto",
              textAlign: "center",
            }}
          />
          <div className="text-sz25 text-gray-700 pt-1">
            이름은 쉼표로 구분해주세요!
            <br />
            ex) 팥 붕어빵, 슈크림 붕어빵
          </div>
        </div>
        <button
          className="mt-4 bg-[#650000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
          onClick={handleSubmit}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default ReportPage;
