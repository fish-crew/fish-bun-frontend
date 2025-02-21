import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import bungBalGameResults from "../bungBalGameResults";
import styles from "../bungBalGamePage.module.css";
import html2canvas from "html2canvas";
import { fetchBungbalData, fetchMbtiData } from "../../../api/service.js";
import AlertModal, {
  showAlert,
} from "../../../components/modals/AlertModal.js";

export default function BungBalResultPage() {
  const { flavorId } = useParams();
  console.log(flavorId);
  const navigate = useNavigate();
  const [matchRate, setMatchRate] = useState("?");
  const userCountRef = useRef(null); // userCount는 변하지 않으므로 useRef 사용

  // selectedFlavor를 useMemo로 최적화
  const selectedFlavor = useMemo(
    () => bungBalGameResults.find((item) => item.flavorType === flavorId),
    [flavorId]
  );

  console.log(selectedFlavor);

  // 유저 카운트 데이터 가져오기 (한 번만 실행)
  useEffect(() => {
    const fetchUserCountData = async () => {
      try {
        const response = await fetchBungbalData();
        if (userCountRef.current !== response) {
          userCountRef.current = response;
        }
      } catch (error) {
        console.error("서버 데이터 가져오기 실패:", error);
      }
    };
    fetchUserCountData();
  }, []);

  // MBTI 매칭 데이터 가져오기 (selectedFlavor 변경 시만 실행)
  useEffect(() => {
    if (!selectedFlavor?.mbti) return;

    const fetchMatchRate = async () => {
      try {
        const response = await fetchMbtiData();
        const data = response?.data?.data;
        const total = response?.data?.additionalData?.total;

        if (!data || total === undefined) throw new Error("데이터 오류");

        const mbtiData = data.find((item) => item.mbti === selectedFlavor.mbti);
        const mbtiCount = mbtiData ? mbtiData.count : 0;
        const calculatedMatchRate = ((mbtiCount / total) * 100).toFixed(2);

        setMatchRate(calculatedMatchRate);
      } catch (error) {
        console.error("MBTI 비율 계산 실패:", error);
        setMatchRate("?");
      }
    };
    fetchMatchRate();
  }, [selectedFlavor]);

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

  const goToBungBalInit = useCallback(() => {
    navigate("/bungBalGamePage");
  }, [navigate]);

  const [copied, setCopied] = useState(false);

  const shareKakaoResult = () => {
    const Kakao = typeof window !== "undefined" ? window.Kakao : null;

    if (Kakao) {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `나의 붕어빵 타입은... ${selectedFlavor.type}!`,
          description: `환상 조합 : ${selectedFlavor.bestMatch}\n환장 조합 : ${selectedFlavor.worstMatch}`,
          imageUrl: `https://bunglog.me/assets/webp/flavorIconsThumb/${selectedFlavor.flavorType}.webp`,
          link: {
            mobileWebUrl: "https://bunglog.me/bungBalGamePage",
            webUrl: "https://bunglog.me/bungBalGamePage",
          },
        },
        itemContent: {
          profileText: "붕어빵 취향 테스트",
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: `https://bunglog.me/bungBalGamePage/result/${selectedFlavor.flavorType}`,
              webUrl: `https://bunglog.me/bungBalGamePage/result/${selectedFlavor.flavorType}`,
            },
          },
          {
            title: "테스트 해보기",
            link: {
              mobileWebUrl: "https://bunglog.me/bungBalGamePage",
              webUrl: "https://bunglog.me/bungBalGamePage",
            },
          },
        ],
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
    const htmlContent = `[붕어빵 취향 테스트]<br>내 붕어빵 타입은 ${selectedFlavor.type}!<br><br>나는 어떤 붕어빵일까?<br>나도 테스트 하러 가기!<br><a href="https://bunglog.me/bungBalGamePage">https://bunglog.me/bungBalGamePage</a>`;
    const plainText = `[붕어빵 취향 테스트]\n내 붕어빵 타입은  ${selectedFlavor.type}!\n\n나는 어떤 붕어빵일까?\n나도 테스트 하러 가기!\nhttps://bunglog.me/bungBalGamePage`;

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

  return (
    <div className="main-area flex flex-grow flex-col w-full bg-cover">
      <AlertModal />
      {/* 상단 네비게이션 바 */}
      <div className="w-full bg-white h-[6dvh] flex justify-between items-center">
        <button
          className="w-10 h-10 flex items-center justify-center"
          style={{
            opacity: 1,
            pointerEvents: "auto",
          }}
          onClick={goToBungBalInit}
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
            {selectedFlavor && (
              <div className="w-full flex flex-col items-center captureArea pb-3 px-2">
                <div className="">나의 붕어빵 타입은...</div>
                <img
                  className="w-[20dvh]"
                  src={selectedFlavor.image}
                  alt={selectedFlavor.type}
                />
                <div className={`text-sz40 font-bold`}>
                  {selectedFlavor.type}
                </div>
                <div className="text-yellow-600 text-sz20 pb-3">
                  전체 사용자 중
                  <span className="font-bold">
                    {matchRate !== null ? matchRate : "..."}
                  </span>
                  %
                </div>

                <div className="border-2 border-dashed border-[#b7d3e4] w-full p-3">
                  <div className={`text-sz30 pb-3  ${styles.highlightArea} `}>
                    {selectedFlavor.slogan}
                  </div>

                  <ul
                    className={`pt-3 w-full flex flex-col items-start ${styles.customList}`}
                  >
                    {selectedFlavor.description.map((desc, index) => (
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
                      src={selectedFlavor.bestMatchImg}
                      alt={selectedFlavor.bestMatch}
                    />
                    <div className="text-sz25">{selectedFlavor.bestMatch}</div>
                  </div>
                  <div className="flex flex-col items-center justify-start p-3 border-2 border-dashed border-[#b7d3e4] w-full">
                    <div
                      className={`text-sz25 mb-2 ${styles.highlightYellow} `}
                    >
                      환장 조합
                    </div>
                    <img
                      className="w-[8dvh]"
                      src={selectedFlavor.worstMatchImg}
                      alt={selectedFlavor.worstMatch}
                    />
                    <div className="text-sz25">{selectedFlavor.worstMatch}</div>
                  </div>
                </div>
              </div>
            )}
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
              <div className={`text-sz25 mt-8 mb-3 ${styles.highlightYellow} `}>
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
              onClick={goToBungBalInit}
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
