import { useState } from "react";
import { useNavigate } from "react-router-dom";

import bungBalGameQuestions from "./bungBalGameData";

function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-[#7b83a8] text-white rounded ${className}`}
    >
      {children}
    </button>
  );
}

function Progress({ value }) {
  return (
    <div className="w-full bg-gray-300 h-2 rounded">
      <div
        className="bg-[#505985] h-2 rounded"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

export default function BungBalGamePage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleStart = () => {
    setStep(1);
  };

  const handleNext = () => {
    if (step <= bungBalGameQuestions.length) {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  const progressPercentage = ((step - 1) / bungBalGameQuestions.length) * 100;
  const bgImage =
    step === 0
      ? `url(/assets/webp/bgBlue.webp)`
      : `url(/assets/webp/checkPatternBlue.webp)`;

  return (
    <div
      className="flex flex-grow flex-col justify-center items-center relative w-full h-full bg-cover
      "
      style={{ backgroundImage: bgImage }}
    >
      <div className="w-full bg-white h-[6dvh] flex justify-between items-center">
        <button
          className="w-10 h-10 flex items-center justify-center"
          disabled={step == 0}
          style={{
            opacity: step === 0 ? 0 : 1,
            pointerEvents: step === 0 ? "none" : "auto",
          }}
          onClick={handleReset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-left w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>
        <img
          className="h-[inherit] p-2"
          src="/assets/webp/logoBalck.webp"
          alt="붕어빵 탐험대"
          onClick={() => navigate("/loadingPage")}
        />
        <button className="w-10 h-10 flex items-center justify-center"></button>
      </div>

      {step === 0 ? (
        <div className="w-full flex-grow flex flex-col items-center justify-evenly max-w-md p-6">
          <div className="flex flex-col w-full items-center justify-center">
            <div className="text-sz40 font-bold text-white pb-4">
              붕어빵 취향 밸런스 게임
            </div>
            <img
              className="p-3"
              src="/assets/webp/bungIcons.webp"
              alt="붕어빵"
            />
          </div>
          <button
            onClick={handleStart}
            className="w-full px-4 py-2 text-sz30 rounded-full bg-white text-[#505985] font-bold"
          >
            시작하기
          </button>
        </div>
      ) : step <= bungBalGameQuestions.length ? (
        <div className="flex w-full h-full max-w-md p-6 flex-col justify-between">
          <div className="w-full p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div className="w-full">
              {/* <p className="text-sm text-center mt-2">
                {Math.round(progressPercentage)}%
              </p> */}
              <Progress value={progressPercentage} />
            </div>
            <div className="w-full">
              <div className="text-sz25 font-bold pb-6 pt-10">
                {bungBalGameQuestions[step - 1].text}
              </div>
              <div className="flex flex-col">
                {bungBalGameQuestions[step - 1].options.map((option, index) => (
                  <div key={index} className="w-full">
                    <Button onClick={handleNext} className="w-full">
                      {option}
                    </Button>
                    {index === 0 && (
                      <div className="text-center font-semibold py-2">VS</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img className="px-6" src="/assets/webp/bungCat.webp" alt="팥냥이" />
        </div>
      ) : (
        <div className="flex w-full h-full max-w-md p-6 flex-col justify-center">
          <div className="w-full h-full p-6 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center">
            <div className="w-full flex justify-center items-center flex-col">
              <div className="text-[#4d567d]">나의 붕어빵 타입은...</div>
              <img
                className="w-[20dvh]"
                src="/assets/webp/flavorIcons/maecom.webp"
                alt="붕어빵"
              />
              <div className="text-sz30 font-bold">매콤 붕어빵</div>
              <ul className="">
                <li className="w-full">
                  개성 강하고, 남들이 잘 선택하지 않는 특별한 걸 좋아하는 타입.
                </li>
                <li className="w-full">
                  붕어빵은 달콤해야 한다는 고정관념을 깨는 모험가 스타일.
                </li>
                <li className="w-full">
                  붕어빵을 아침식사로도 먹을 수 있다고 생각하는 편.
                </li>
                <li className="w-full">
                  새로운 맛의 붕어빵을 보면 반드시 도전해보는 유형.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
