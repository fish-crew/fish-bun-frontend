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

  const handleCaptureAndDownload = async () => {
    try {
      // 캡처 대상 설정
      const element = document.querySelector(".captureArea");

      // html2canvas로 캡처
      const canvas = await html2canvas(element);

      const dataURL = canvas.toDataURL("image/png");

      // 현재 날짜와 시간 가져오기
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      // 파일 이름 포맷팅
      const fileName = `bungBalGame-${year}-${month}-${date}-${hours}-${minutes}-${seconds}.png`;

      // 다운로드 링크 생성
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("캡처 오류:", error);
      {
        showAlert("화면 캡처 중 오류가 발생했습니다.");
      }
    }
  };

  const goToMainService = useCallback(() => {
    navigate("/");
  }, [navigate]);

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

  if (step > bungBalGameQuestions.length) {
    setTimeout(() => {
      const scrollArea = document.querySelector(".overflow-y-auto");
      if (scrollArea && scrollArea.scrollTop !== 0) {
        scrollArea.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);

    const scrollToBottom = () => {
      const scrollArea = document.querySelector(".overflow-y-auto");
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    };

    const shareKakaoResult = () => {
      const Kakao = typeof window !== "undefined" ? window.Kakao : null;
      const imageName = finalResult.image.split("/").pop().split(".")[0];

      if (Kakao) {
        Kakao.Share.sendCustom({
          templateId: 117313,
          templateArgs: {
            result: finalResult.type,
            typeImg: `https://bunglog.me/assets/webp/flavorIconsThumb/${imageName}.webp`,
            bestMatch: finalResult.bestMatch,
            worstMatch: finalResult.worstMatch,
          },
        });
      } else {
        console.error("Kakao SDK is not initialized.");
      }
    };

    const shareKakaoLink = () => {
      const Kakao = typeof window !== "undefined" ? window.Kakao : null;

      if (Kakao) {
        Kakao.Share.sendCustom({
          templateId: 117601,
        });
      } else {
        console.error("Kakao SDK is not initialized.");
      }
    };

    const handleCopyResult = async () => {
      const htmlContent = `[붕어빵 취향 테스트]<br>내 붕어빵 타입은 ${finalResult.type}!<br><br>나는 어떤 붕어빵일까?<br>나도 테스트 하러 가기!<br><a href="https://bunglog.me/bungBalGamePage">https://bunglog.me/bungBalGamePage</a>`;
      const plainText = `[붕어빵 취향 테스트]\n내 붕어빵 타입은  ${finalResult.type}!\n\n나는 어떤 붕어빵일까?\n나도 테스트 하러 가기!\nhttps://bunglog.me/bungBalGamePage`;

      if (navigator.clipboard && navigator.clipboard.write) {
        try {
          const htmlBlob = new Blob([htmlContent], { type: "text/html" });
          const textBlob = new Blob([plainText], { type: "text/plain" });
          const clipboardItem = new ClipboardItem({
            "text/html": htmlBlob,
            "text/plain": textBlob,
          });

          await navigator.clipboard.write([clipboardItem]);
          setCopied(true);
          {
            showAlert("클립보드에 복사되었습니다!");
          }
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error("Failed to copy link:", error);
          {
            showAlert("클립보드 복사에 실패했습니다.");
          }
        }
      }
    };
    const handleCopyLink = async () => {
      const htmlContent = `[붕어빵 취향 테스트]<br>나는 어떤 붕어빵일까?<br>테스트 해보기<br><a href="https://bunglog.me/bungBalGamePage">https://bunglog.me/bungBalGamePage</a>`;
      const plainText = `[붕어빵 취향 테스트]\n나는 어떤 붕어빵일까?\n테스트 해보기\nhttps://bunglog.me/bungBalGamePage`;

      if (navigator.clipboard && navigator.clipboard.write) {
        try {
          const htmlBlob = new Blob([htmlContent], { type: "text/html" });
          const textBlob = new Blob([plainText], { type: "text/plain" });
          const clipboardItem = new ClipboardItem({
            "text/html": htmlBlob,
            "text/plain": textBlob,
          });

          await navigator.clipboard.write([clipboardItem]);
          setCopied(true);
          {
            showAlert("클립보드에 복사되었습니다!");
          }
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error("Failed to copy link:", error);
          {
            showAlert("클립보드 복사에 실패했습니다.");
          }
        }
      }
    };

    // DOM 변경 감지 후 실행
    const observer = new MutationObserver(() => {
      scrollToBottom();
    });

    return (
      <div className="main-area flex flex-grow flex-col w-full bg-cover">
        <AlertModal />
        {/* 상단 네비게이션 바 */}
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
              className="bi bi-chevron-left w-6 h-6"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
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

        {/* 콘텐츠 영역 */}
        <div
          className="flex w-full max-w-md flex-col justify-start"
          style={{ height: "calc(100vh - 10dvh - 90px)" }}
        >
          <div className="w-full bg-white shadow-lg flex flex-col justify-start items-center h-full overflow-y-auto">
            <div className="w-full h-max">
              <img src="/assets/webp/paperOnCheckT.webp" alt="상단 배너" />
            </div>
            <div
              className={`resultArea w-full flex flex-col items-center p-3  ${styles.resultArea}`}
            >
              <div className="w-full flex flex-col items-center captureArea pb-3 px-2">
                <div className="">나의 붕어빵 타입은...</div>
                <img
                  className="w-[20dvh]"
                  src={result.image}
                  alt={result.type}
                />
                <div className={`text-sz40 font-bold`}>{result.type}</div>
                <div className="text-yellow-600 text-sz20 pb-3">
                  전체 사용자 중{" "}
                  <span className="font-bold">
                    {matchRate !== null ? matchRate : "..."}
                  </span>
                  %
                </div>

                <div className="border-2 border-dashed border-[#b7d3e4] w-full p-3">
                  <div className={`text-sz30 pb-3  ${styles.highlightArea} `}>
                    {result.slogan}
                  </div>

                  <ul
                    className={`pt-3 w-full flex flex-col items-start ${styles.customList}`}
                  >
                    {result.description.map((desc, index) => (
                      <li key={index} className="text-start">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-[1.5dvh] text-[#1069b0]">
                  붕어빵 취향 테스트 by 붕어빵 탐험대
                </div>
                <div className="w-full flex gap-3">
                  <div className="flex flex-col items-center justify-start p-3 border-2 border-dashed border-[#b7d3e4] w-full">
                    <div
                      className={`text-sz25 mb-2 ${styles.highlightYellow} `}
                    >
                      환상 조합
                    </div>
                    <img
                      className="w-[8dvh]"
                      src={result.bestMatchImg}
                      alt={result.bestMatch}
                    />
                    <div className="text-sz25">{result.bestMatch}</div>
                  </div>
                  <div className="flex flex-col items-center justify-start p-3 border-2 border-dashed border-[#b7d3e4] w-full">
                    <div
                      className={`text-sz25 mb-2 ${styles.highlightYellow} `}
                    >
                      환장 조합
                    </div>
                    <img
                      className="w-[8dvh]"
                      src={result.worstMatchImg}
                      alt={result.worstMatch}
                    />
                    <div className="text-sz25">{result.worstMatch}</div>
                  </div>{" "}
                </div>
              </div>
              <div className="w-full flex gap-5 items-center justify-center p-8">
                <img
                  src="/assets/webp/dots.webp"
                  alt="•"
                  className="text-[#1069b0] w-4 h-4"
                />
                <img
                  src="/assets/webp/dots.webp"
                  alt="•"
                  className="text-[#1069b0] w-4 h-4"
                />
                <img
                  src="/assets/webp/dots.webp"
                  alt="•"
                  className="text-[#1069b0] w-4 h-4"
                />
              </div>
              <div className=" w-full flex items-center justify-center flex-col">
                <div className="text-sz25 pb-1">
                  내가 먹은 붕어빵 기록하러 가기
                </div>
                <button className="w-full " onClick={goToMainService}>
                  <div className="p-3 border-2 border-dashed border-[#b7d3e4]">
                    <img
                      src="/assets/webp/thumbMainRec.webp"
                      alt="share on kakao button"
                      className="rounded-lg"
                    />

                    <div className="">팥냥이와 함께 떠나는 붕어빵 탐험!</div>
                  </div>
                </button>
                <div
                  className={`text-sz25 mt-8 mb-3 ${styles.highlightYellow} `}
                >
                  내 테스트 결과 공유하기
                </div>
                <div className="w-full flex gap-3 justify-center">
                  <button
                    className="w-[6.7dvh]"
                    onClick={handleCaptureAndDownload}
                  >
                    <img
                      src="/assets/webp/captureBtn.webp"
                      alt="share button"
                      className=""
                    />
                  </button>
                  <button className="w-[6.7dvh]" onClick={shareKakaoResult}>
                    <img
                      src="/assets/webp/kakaoBtn.webp"
                      alt="share on kakao button"
                      className=""
                    />
                  </button>
                  <button className="w-[6.7dvh] " onClick={handleCopyResult}>
                    <img
                      src="/assets/webp/linkBtn.webp"
                      alt="copy link button"
                      className=""
                    />
                  </button>
                </div>
                <div className="text-sz25 mt-8">테스트 링크만 공유하기</div>
                <div className="w-full flex gap-3 justify-center">
                  <button className="w-[6.7dvh]" onClick={shareKakaoLink}>
                    <img
                      src="/assets/webp/kakaoBtn.webp"
                      alt="share on kakao button"
                      className=""
                    />
                  </button>
                  <button className="w-[6.7dvh] " onClick={handleCopyLink}>
                    <img
                      src="/assets/webp/linkBtn.webp"
                      alt="copy link button"
                      className=""
                    />
                  </button>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 text-sz30 rounded-full text-white bg-[#1069b0]  mt-8 flex justify-center items-center gap-2"
              >
                테스트 다시하기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-clockwise w-[3dvh] h-[3dvh] stroke-white stroke-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
              마리의 붕어빵이 수집됐어요{" "}
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
