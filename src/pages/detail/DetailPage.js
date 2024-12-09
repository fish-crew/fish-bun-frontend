import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import diaryPhotoBox from "../../assets/diaryPhotoBox.png";
import diaryLine from "../../assets/diaryLine.png";

function DetailsPage() {
  const { id } = useParams(); // 경로에서 id 가져오기
  const content = "오늘은 팥붕어를 먹었다. 슈크림 붕어빵도 먹었다. 그래서 총 3종류를 먹었다. 오늘은 팥붕어를 먹었다. 슈크림 붕어빵도 먹었다. 그래서 총 3종류를 먹었다.";

  const textRef = useRef(null); // 텍스트 컨테이너 참조
  const [lineCount, setLineCount] = useState(0); // 텍스트 줄 수 저장

  // 텍스트 줄 수 계산
  useEffect(() => {
    const calculateLineCount = () => {
      if (textRef.current) {
        const containerHeight = textRef.current.offsetHeight; // 텍스트 컨테이너 높이
        const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight); // 한 줄의 높이
        setLineCount(Math.ceil(containerHeight / lineHeight)); // 줄 수 계산
      }
    };

    calculateLineCount();
    window.addEventListener("resize", calculateLineCount); // 화면 크기 변화 감지

    return () => window.removeEventListener("resize", calculateLineCount); // 이벤트 제거
  }, []);

  return (
    <div className="flex flex-col justify-start h-full">
      <div className="flex justify-between ml-6 mr-8 my-4 text-sz30 md:text-sz35">
        <div>12월 8일 일요일</div>
        <div>날씨: 빵어붕</div>
      </div>

      <div className="flex flex-col px-6 flex-grow justify-start w-full">
        <div className="flex justify-center h-[30dvh]">
          <img src={diaryPhotoBox} alt="diaryPhotoBox" />
        </div>

        {/* 텍스트와 선 */}
        <div className="relative w-full text-sz35 text-start leading-[3rem] px-2 pt-4">
          {/* 텍스트 */}
          <p ref={textRef} className="relative z-10 break-all">
            {content}
          </p>

          {/* 선 이미지 */}
          <div className="absolute top-14 left-0 w-full h-full pointer-events-none z-0">
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
  );
}

export default DetailsPage;
