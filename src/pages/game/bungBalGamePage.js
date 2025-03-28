import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import bungBalGameQuestions from "./bungBalGameData";
import bungBalGameResults, { matchBungBalType } from "./bungBalGameResults";
import styles from "./bungBalGamePage.module.css";
import html2canvas from "html2canvas";
import { fetchBungbalData, fetchMbtiData } from "../../api/service.js";
import AlertModal, { showAlert } from "../../components/modals/AlertModal.js";

function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-4 bg-[#1069b0] text-white text-sz25  rounded ${className}`}
    >
      {children}
    </button>
  );
}

function Progress({ value }) {
  return (
    <div className="w-full bg-gray-300 h-2 rounded">
      <div
        className="bg-[#1069b0] h-2 rounded"
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
    setStep(step + 1);
  };

  const handleReset = () => {
    setStep(0);
    setUserAnswers([]);
    fetchUserCountData();
    setFinalResult(null);
  };

  // const fetchUserCountData = async () => {
  //   try {
  //     const response = await fetchBungbalData();
  //     return response;
  //   } catch (error) {
  //     console.error("데이터 가져오기 실패:", error);
  //     // alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
  //   }
  // };

  //서버에서 데이터 받아오기기
  const [userCount, setUserCount] = useState();

  // 서버에서 데이터 가져오기 및 초기화 판단
  const fetchUserCountData = async () => {
    try {
      const response = await fetchBungbalData();
      const userCount = response;
      setUserCount(userCount);
    } catch (error) {
      console.error("서버 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    const Kakao = typeof window !== "undefined" ? window.Kakao : null;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init("2f592f29ac8bd230f9554175da46fedd");
      // console.log("Kakao initialized:", Kakao.isInitialized());
    }
  }, []);

  // Main 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    fetchUserCountData();
  }, []);

  const progressPercentage = ((step - 1) / bungBalGameQuestions.length) * 100;
  const bgImage = step === 0 ? `` : `url(/assets/webp/bgBlue.webp)`;

  const [matchRate, setMatchRate] = useState(null); // 서버에서 가져온 매칭 비율 저장
  const [finalResult, setFinalResult] = useState(null); // 결과를 저장할 상태
  const [copied, setCopied] = useState(false);

  // 최종 결과를 한 번만 계산하여 저장 (handleReset이 호출되기 전까지 유지됨)
  const result = useMemo(() => {
    if (step > bungBalGameQuestions.length && finalResult === null) {
      const computedResult = matchBungBalType(userAnswers);
      setFinalResult(computedResult);
      return computedResult;
    }
    return finalResult;
  }, [step, userAnswers, finalResult]);
  // 결과가 결정된 후 matchRate 가져오기
  useEffect(() => {
    if (result && result.mbti) {
      async function fetchMatchRate() {
        try {
          const response = await fetchMbtiData();
          const data = response?.data?.data;
          const total = response?.data?.additionalData?.total;

          if (!data || total === undefined) {
            throw new Error("서버에서 올바른 데이터를 받지 못했습니다.");
          }

          const mbtiData = data.find((item) => item.mbti === result.mbti);
          const mbtiCount = mbtiData ? mbtiData.count : 0;
          const calculatedMatchRate = ((mbtiCount / total) * 100).toFixed(2);

          setMatchRate(calculatedMatchRate);
        } catch (error) {
          console.error("MBTI 비율 계산 실패:", error);
          setMatchRate("?");
        }
      }
      fetchMatchRate();
    }
  }, [result]); // result가 변경될 때만 실행

  const goToBungBalResult = useCallback(
    (type) => {
      navigate(`/bungBalGamePage/result/${type}`);
    },
    [navigate]
  );

  if (step > bungBalGameQuestions.length) {
    const type = result.flavorType;
    goToBungBalResult(type);
  }

  return (
    <div
      className="flex flex-grow flex-col justify-center items-center relative w-full bg-cover"
      style={{ backgroundImage: bgImage }}
    >
      <div className="w-full bg-white h-[6dvh] flex justify-between items-center border-b border-[rgb(211,211,211)]">
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
        <div className="w-full flex-grow flex flex-col items-center justify-evenly max-w-md p-5">
          <div className="flex flex-col w-full items-center justify-center">
            <div className="text-sz30  pb-2">나는 어떤 붕어빵일까?</div>
            <img
              className="px-5"
              src="/assets/webp/bungIcons.webp"
              alt="붕어빵"
            />
            <div className="text-[5dvh] font-medium pt-2 ">
              붕어빵 취향 테스트
            </div>
          </div>
          <div className="w-full flex flex-col">
            <button
              onClick={handleStart}
              className="w-full px-4 py-2 rounded-full text-white bg-[#1069b0] "
            >
              <div className="text-sz30 font-bold">시작하기</div>
            </button>
            <div className="text-[#1069b0] pt-1 flex items-center justify-center">
              총 <span className="text-[#f8bd6f] font-bold">{userCount}</span>
              마리의 붕어빵이 수집됐어요
              <img
                src="/assets/webp/cal-bun.webp"
                alt="!"
                className="w-4 h-4 inline"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-grow max-w-md p-5 flex-col justify-between">
          <div className="w-full h-full p-5 bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div className="w-full">
              <Progress value={progressPercentage} />
            </div>
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
          {/* <img className="px-6" src="/assets/webp/bungCat.webp" alt="팥냥이" /> */}
        </div>
      )}
    </div>
  );
}
