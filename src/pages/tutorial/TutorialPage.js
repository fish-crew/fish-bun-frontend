import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function TextBlock({ text, ref, lineCount }) {
  return (
    <div className="relative w-full text-sz25 text-start leading-[1.8rem] px-2">
      <p ref={ref} className="relative z-10 break-all">
        {text.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <div className="absolute top-[3.4rem] left-0 w-full pointer-events-none z-0">
        {Array.from({ length: lineCount }, (_, index) => (
          <img
            key={`line-${index}`}
            src="/assets/webp/diaryLine.webp"
            alt="diaryLine"
            className="w-full h-[0.2rem]"
            style={{ position: "absolute", top: `${index * 1.9}rem` }}
          />
        ))}
      </div>
    </div>
  );
}

function TutorialPage() {
  const navigate = useNavigate();
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const [lineCount1, setLineCount1] = useState(0);
  const [lineCount2, setLineCount2] = useState(0);

  const handleClose = () => navigate("/loadingPage");
  const moveToMain = () => navigate("/mainPage");

  const loadingPageTxt = `
    [로딩 페이지]\n팥냥이와 함께 떠나는 붕어빵 탐험!
  `;
  const loginPageTxt = `
    [로그인 페이지]\n카카오 계정으로 로그인해주세요~
  `;

  useEffect(() => {
    const calculateLineCount = debounce((ref, setLineCount) => {
      if (ref.current) {
        const containerHeight = ref.current.offsetHeight;
        const lineHeight = parseFloat(
          getComputedStyle(ref.current).lineHeight || "1"
        );
        setLineCount(Math.ceil(containerHeight / lineHeight));
      }
    }, 300);

    calculateLineCount(textRef1, setLineCount1);
    calculateLineCount(textRef2, setLineCount2);

    window.addEventListener("resize", () => {
      calculateLineCount(textRef1, setLineCount1);
      calculateLineCount(textRef2, setLineCount2);
    });

    return () =>
      window.removeEventListener("resize", () => {
        calculateLineCount(textRef1, setLineCount1);
        calculateLineCount(textRef2, setLineCount2);
      });
  }, [loadingPageTxt, loginPageTxt]);

  return (
    <div className="flex flex-col justify-start h-full overflow-y-auto relative">
      <div className="w-full h-max">
        <img src="/assets/webp/paperOnCheckT.webp" alt="상단 배너" />
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
        className="w-full flex flex-col flex-grow bg-cover bg-repeat-y items-center"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}
      >
        <div className="flex flex-col px-3 flex-grow justify-start w-full">
          <TextBlock
            text={loadingPageTxt}
            ref={textRef1}
            lineCount={lineCount1}
          />
          <TextBlock
            text={loginPageTxt}
            ref={textRef2}
            lineCount={lineCount2}
          />
        </div>
        <button
          className="my-4 bg-[#630000] hover:bg-white hover:text-[#630000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
          onClick={moveToMain}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default TutorialPage;
