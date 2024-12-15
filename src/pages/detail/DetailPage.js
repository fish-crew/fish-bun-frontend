import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import diaryPhotoBox from "../../assets/diaryphotoBox.png";
import diaryLine from "../../assets/diaryLine.png";
import paperOnCheckB from "../../assets/paperOnCheckB.jpg";
import paperOnCheckT from "../../assets/paperOnCheckT.jpg";
import bun from "../../assets/bun.png";

function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // 경로에서 id 가져오기
  const content =
    "오늘은 팥붕어를 먹었다. 슈크림 붕어빵도 먹었다. 그래서 총 3종류를 먹었다. 오늘은 팥붕어를 먹었다. 슈크림 붕어빵도 먹었다. 그래서 총 3종류를 먹었다. 오늘은 팥붕어를 먹었다. 슈크림 붕어빵도 먹었다. 그래서 총 3종류를 먹었다. ";

  const textRef = useRef(null); // 텍스트 컨테이너 참조
  const [lineCount, setLineCount] = useState(0); // 텍스트 줄 수 저장

  // 텍스트 줄 수 계산
  useEffect(() => {
    const calculateLineCount = () => {
      if (textRef.current) {
        const containerHeight = textRef.current.offsetHeight; // 텍스트 컨테이너 높이
        const lineHeight = parseFloat(
          getComputedStyle(textRef.current).lineHeight
        ); // 한 줄의 높이
        setLineCount(Math.ceil(containerHeight / lineHeight)); // 줄 수 계산
      }
    };

    calculateLineCount();
    window.addEventListener("resize", calculateLineCount); // 화면 크기 변화 감지

    return () => window.removeEventListener("resize", calculateLineCount); // 이벤트 제거
  }, []);

  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate("/calendarPage");
  };

  return (
    <div className="flex flex-col justify-start h-full overflow-y-auto relative">
      <div className="w-full h-max">
        <img src={paperOnCheckT} alt="상단 배너" />
      </div>
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
      <div
        className="w-full flex flex-col flex-grow bg-cover bg-repeat-y"
        style={{ backgroundImage: `url(${paperOnCheckB})` }}
      >
        <div className="flex justify-between mx-4 mt-4 text-sz30">
          <div>12월 8일 일요일</div>
          <div>날씨:어쨌든맑음</div>
        </div>
        <div className="flex flex-col px-3 pb-3 flex-grow justify-start w-full">
          <div className="relative flex justify-center items-center h-auto w-full">
            {/* 테두리 이미지 */}
            <img
              src={diaryPhotoBox}
              alt="diaryPhotoBox"
              className="absolute w-full h-full object-contain pointer-events-none"
            />

            {/* 가운데 배치할 이미지 */}
            <div className="relative w-full h-full flex justify-center items-center">
              <img
                src={bun} // 가운데 배치할 이미지 경로
                alt="bunImage"
                className="w-[70%] h-[70%] object-contain"
              />
            </div>
          </div>

          {/* 텍스트와 선 */}
          <div className="relative w-full text-sz35 text-start leading-[3rem] px-2">
            {/* 텍스트 */}
            <p ref={textRef} className="relative z-10 break-all">
              {content}
            </p>

            {/* 선 이미지 */}
            <div className="absolute top-10 left-0 w-full pointer-events-none z-0">
              {Array.from({ length: lineCount }).map((_, index) => (
                <img
                  key={index}
                  src={diaryLine}
                  alt="diaryLine"
                  className="w-full h-[0.3rem]"
                  style={{ position: "absolute", top: `${index * 3}rem` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
