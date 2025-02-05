import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bungBalGameQuestions from "./bungBalGameData";
import bungBalGameResults, { matchBungBalType } from "./bungBalGameResults";

function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-4 bg-[#7b83a8] text-sz25 text-white rounded ${className}`}
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
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  const handleStart = () => {
    setStep(1);
  };

  const handleAnswer = (option) => {
    const newAnswers = [...userAnswers, option];
    setUserAnswers(newAnswers);

    // 마지막 문항이면 결과 페이지로 이동
    if (step === bungBalGameQuestions.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setUserAnswers([]);
  };

  const progressPercentage = ((step - 1) / bungBalGameQuestions.length) * 100;
  const bgImage =
    step === 0
      ? `url(/assets/webp/bgBlue.webp)`
      : `url(/assets/webp/checkPatternBlue.webp)`;

  if (step > bungBalGameQuestions.length) {
    const result = matchBungBalType(userAnswers);
    return (
      <div
        className="flex flex-grow flex-col justify-center items-center relative w-full h-full bg-cover"
        style={{ backgroundImage: `url(/assets/webp/checkPatternBlue.webp)` }}
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

        <div className="flex w-full h-full max-w-md p-6 flex-col justify-center">
          <div className="w-full h-full p-6 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center">
            <div className="w-full flex justify-center items-center flex-col">
              <div className="text-[#4d567d]">나의 붕어빵 타입은...</div>
              <img className="w-[20dvh]" src={result.image} alt={result.type} />
              <div className="text-sz30 font-bold">{result.type}</div>
              <ul className="text-center">
                <li className="w-full">{result.description}</li>
              </ul>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2 bg-[#505985] text-white rounded-full"
              >
                다시하기 🔄
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-grow flex-col justify-center items-center relative w-full h-full bg-cover"
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
            <div className="text-sz30 text-white pb-2">
              나는 어떤 붕어빵일까?
            </div>
            <img
              className="px-5"
              src="/assets/webp/bungIcons.webp"
              alt="붕어빵"
            />
            <div className="text-[5dvh] font-bold pt-2 text-white">
              붕어빵 취향 테스트
            </div>
          </div>
          <button
            onClick={handleStart}
            className="w-full px-4 py-2 text-sz30 rounded-full bg-white text-[#505985] font-bold"
          >
            시작하기
          </button>
        </div>
      ) : (
        <div className="flex w-full h-full max-w-md p-6 flex-col justify-between">
          <div className="w-full p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div className="w-full">
              <Progress value={progressPercentage} />
            </div>
            <div className="w-full">
              <div className="text-sz30 font-bold pb-6 pt-10">
                {bungBalGameQuestions[step - 1].text}
              </div>
              <div className="flex flex-col">
                {bungBalGameQuestions[step - 1].options.map((option, index) => (
                  <div key={index} className="w-full">
                    <Button
                      onClick={() => handleAnswer(option)}
                      className="w-full"
                    >
                      {option.text}
                    </Button>
                    {(index === 0 ||
                      (bungBalGameQuestions[step - 1].options.length === 3 &&
                        index === 1)) && (
                      <div className="text-center font-semibold py-2">VS</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <img className="px-6" src="/assets/webp/bungCat.webp" alt="팥냥이" /> */}
        </div>
      )}
    </div>
  );
}
