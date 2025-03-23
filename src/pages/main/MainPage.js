import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./MainPage.module.css";
import Modal from "../../components/modals/Modal.js";
import modalStyles from "../../components/modals/Modal.module.css";
import AlertModal, { showAlert } from "../../components/modals/AlertModal.js";
import tutorialPages from "../../components/modals/TutorialData.js";
import {
  fetchUserData,
  fetchMainPageData,
  updateFirstLogin,
} from "../../api/service.js";
import { useDispatch, useSelector } from "react-redux"; //Redux Store에서 가져오기
import { setNickname, setUserId } from "../../redux/slices/user.js"; // Redux 액션 가져오기

function FishFrame() {
  // 서버에서 userInfo 데이터 받아오기
  const [userInfoData, setUserInfoData] = useState(null);
  const dispatch = useDispatch(); // Redux 액션 디스패치를 위한 훅

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userInfoData) {
          const response = await fetchUserData();
          // setUserInfoData(data); //이건 일단 뺴고 닉네임만 redux에 저장
          const nickname = response.data.nickname;
          dispatch(setNickname(nickname)); // Redux Store에 닉네임 저장
          dispatch(setUserId(response.data.id)); // Redux Store에 id 저장
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  //서버에서 main 페이지에 사용할 코드 받아오기
  const [eatenDays, setEatenDays] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMainPageData(); // 서버 데이터 가져오기

        // daysInWeek가 null 이면 빈 객체를 사용
        setEatenDays(response.data.daysInWeek || {});
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const today = new Date();
  const dayMapping = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  const todayEnglish = dayMapping[today.getDay()]; // 오늘 요일 (영어)

  const goToAdd = () => {
    if (eatenDays[todayEnglish]) {
      //키가 존재하는지 확인
      // alert("오늘은 이미 붕어빵을 등록하셨습니다!");
      {
        showAlert("오늘은 이미 붕어빵을 등록하셨습니다!");
      }
      return;
    }
    // 버튼 클릭 시 sessionStorage에 플래그 저장
    sessionStorage.setItem("addPageAllowed", "true");
    navigate("/register/addPage");
  };

  const frameRef = useRef(null);
  const [radius, setRadius] = useState(0);
  const [imageSize, setImageSize] = useState(0);

  const weekDays = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
  ];

  const calculateSizes = () => {
    if (frameRef.current) {
      const frameWidth = frameRef.current.offsetWidth;
      setRadius(frameWidth / 3.45);
      setImageSize(frameWidth / 4.25);
    }
  };

  useEffect(() => {
    calculateSizes();
    window.addEventListener("resize", calculateSizes);
    return () => window.removeEventListener("resize", calculateSizes);
  }, []);

  const goToDetail = (day) => {
    if (day) {
      // eatenDays 객체에서 해당 day(영어 요일)를 key로 사용하여 id를 가져옴
      const id = eatenDays[day] || null;

      if (id) {
        // console.log(`${day} 클릭됨, ID: ${id}`);
        navigate(`/detail/${id}`);
      }
    } else {
      console.error(`${day}에 해당하는 영어 요일이 없습니다.`);
    }
  };

  return (
    <div className="">
      <div ref={frameRef} className="frame-area relative w-full aspect-[1/1]">
        <div
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover drop-shadow-smGray"
          style={{ backgroundImage: `url(/assets/webp/bun-frame.webp)` }}
        ></div>
        {weekDays.map((day, index) => {
          const angle = (360 / weekDays.length) * index;
          const baseTransform = `translate(-50%, -50%) rotate(${angle}deg)`;
          const imageSrc = eatenDays[day]
            ? "/assets/webp/bun-frame-filled.webp"
            : "/assets/webp/bun-frame-empty.webp";

          return (
            <React.Fragment key={day}>
              <div
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `${baseTransform} translate(${radius}px)`,
                  zIndex: 10, // z-index 추가해야 클릭 가능
                }}
                onClick={() => goToDetail(day)}
              >
                <img
                  src={imageSrc}
                  alt={`fish-${day}`}
                  style={{
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                  }}
                  className="object-cover drop-shadow-smGray"
                />
              </div>
              {/* <div
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `${baseTransform} translate(${
                    radius * 1.3
                  }px) rotate(${-angle}deg)`,
                }}
              >
                <p className="text-center text-sz40 font-bold text-[#2a2523]">
                  {day}
                </p>
              </div> */}
            </React.Fragment>
          );
        })}
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          onClick={goToAdd}
        >
          <img
            src={
              eatenDays[todayEnglish]
                ? "/assets/webp/goToRegisterBtn.webp" // 이미 등록 되었을 때
                : "/assets/webp/goToRegisterBtn_blue.webp" // 등록 아직 안되었을 때 (파란색)
            }
            alt="등록 버튼"
            className="p-2"
            style={{
              width: `${imageSize * 0.7}px`,
              height: `${imageSize * 0.7}px`,
            }}
          />
        </button>
      </div>
    </div>
  );
}

function Main() {
  const nickname = useSelector((state) => state.user.nickname); // Redux 상태에서 닉네임 가져오기
  const navigate = useNavigate();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false); // 공유하기 메뉴 상태
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // 사이드 메뉴 상태

  const dispatch = useDispatch(); // Redux 디스패치

  const toggleShareMenu = () => {
    setIsShareMenuOpen((prev) => !prev);
    setIsSideMenuOpen(false); // 사이드 메뉴 닫기
  };
  const closeShareMenu = () => {
    setIsShareMenuOpen(false); // 공유 메뉴 닫기
  };
  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
    setIsShareMenuOpen(false); // 공유 메뉴 닫기
  };
  const closeSideMenu = () => {
    setIsSideMenuOpen(false); // 사이드 메뉴 닫기
  };

  const goToMap = () => {
    navigate("/map");
  };
  const goToCalendar = () => {
    navigate("/CalendarPage");
  };
  const goToBook = () => {
    navigate("/BookPage");
  };

  const handleCaptureAndDownload = async () => {
    try {
      setIsShareMenuOpen(false); // 메뉴 닫기

      // 캡처 대상 설정
      const element = document.querySelector(".main-area");
      const profileArea = document.querySelector(".profileArea");
      const bunTxtArea = document.querySelector(".bunTxtArea");
      const originalBackgroundImage = element.style.backgroundImage;
      const btnArea = document.querySelector(".btn-area");

      if (btnArea) {
        profileArea.style.justifyContent = "start";
        bunTxtArea.style.top = "-0.2dvh";
      }

      // html2canvas로 캡처
      const canvas = await html2canvas(element);

      element.style.backgroundImage = originalBackgroundImage;

      if (btnArea) {
        profileArea.style.justifyContent = "center";
        bunTxtArea.style.top = "-1dvh"; // top 속성 올바르게 적용
      }

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
      const fileName = `bunglog-${year}-${month}-${date}-${hours}-${minutes}-${seconds}.png`;

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

  //서버에서 데이터 받아오기기
  const [monthlyCount, setMonthlyCount] = useState();

  // 서버에서 데이터 가져오기 및 초기화 판단
  const fetchAndUpdateData = async () => {
    try {
      const response = await fetchMainPageData(); // 서버 데이터 가져오기
      const { weeklyCount, monthlyCount } = response.data;

      // 월간 카운트 업데이트
      setMonthlyCount(monthlyCount);
    } catch (error) {
      console.error("서버 데이터 가져오기 실패:", error);
    }
  };

  // Main 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  const [isFirstLogin, setFirstLogin] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const openModal = () => {
    setModalOpen(true);
    setCurrentPage(0);
    setIsSideMenuOpen(false); // 사이드 메뉴 닫기
  };

  const handleNext = () => {
    if (currentPage === tutorialPages.length - 1) {
      {
        showAlert("마지막 페이지 입니다!");
      }
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, tutorialPages.length - 1));
    }
  };

  const handlePrev = () => {
    if (currentPage === 0) {
      {
        showAlert("첫 페이지 입니다!");
      }
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };
  const scrollableRef = useRef(null); // 모달 내부 스크롤 영역 참조

  useEffect(() => {
    const scrollArea = scrollableRef.current;
    if (scrollArea) {
      scrollArea.style.overflow = "hidden"; // 스크롤 잠금
      scrollArea.scrollTop = 0; // 스크롤 초기화
      scrollArea.style.overflow = "auto";
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData();
        const isFirstLogin = response.data.isFirstLogin;
        setFirstLogin(isFirstLogin);

        // 최초 로그인이라면 모달을 띄우고 API 호출
        if (isFirstLogin === "Y") {
          setTimeout(() => setModalOpen(true), 500);

          try {
            const response = await updateFirstLogin();
          } catch (error) {
            console.error("Failed to update first login status:", error);
          }
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        {
          showAlert("서버로부터 데이터를 가져오는 데 실패했습니다.");
        }
      }
    };

    fetchData();
  }, []);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const Kakao = typeof window !== "undefined" ? window.Kakao : null;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init("2f592f29ac8bd230f9554175da46fedd");
      // console.log("Kakao initialized:", Kakao.isInitialized());
    }
  }, []);

  const shareKakao = () => {
    const Kakao = typeof window !== "undefined" ? window.Kakao : null;
    if (Kakao) {
      Kakao.Share.sendCustom({
        templateId: 115802,
        templateArgs: {
          PROFILE: "https://bunglog.me/",
          THUMB: "https://bunglog.me/",
        },
      });
    } else {
      console.error("Kakao SDK is not initialized.");
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const htmlContent = `[붕어빵 탐험대]<br>팥냥이와 함께 떠나는 붕어빵 탐험!<br><a href="https://bunglog.me">https://bunglog.me</a>`;
    const plainText = `[붕어빵 탐험대]\n팥냥이와 함께 떠나는 붕어빵 탐험!\nhttps://bunglog.me`;

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

  const showNotice = () => {
    {
      showAlert("등록된 공지사항이 없습니다.");
    }
  };

  return (
    <div
      className="main-area w-full flex flex-grow flex-col bg-cover relative"
      style={{
        backgroundImage: `url(/assets/webp/mainBg.webp)`,
      }}
    >
      <AlertModal />
      {/* Modal 컴포넌트 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={tutorialPages[currentPage]?.title || "Tutorial"}
      >
        <div className="flex flex-col items-center justify-between flex-1">
          <div
            ref={scrollableRef}
            className={`scrollableArea ${styles.modalScroll}`}
          >
            <img
              src={tutorialPages[currentPage].image}
              alt={`Page ${currentPage + 1}`}
              style={{ width: "100%" }}
              className={`${modalStyles.modalImg} pb-2`}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: tutorialPages[currentPage].text,
              }}
              className={styles.inlineImg}
            ></div>
          </div>
          <div
            className={`flex justify-between w-full ${styles.borderTop} pt-2`}
          >
            <button
              onClick={handlePrev}
              className={`flex items-center text-sz25 ${
                currentPage === 0 ? "text-gray-500" : "text-[#1069b0]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
              &nbsp;{currentPage === 0 ? "첫 페이지" : "이전 페이지"}
            </button>
            <button
              onClick={handleNext}
              className={`flex items-center text-sz25 ${
                currentPage === tutorialPages.length - 1
                  ? "text-gray-500"
                  : "text-[#1069b0]"
              }`}
            >
              {currentPage === tutorialPages.length - 1
                ? "마지막 페이지"
                : "다음 페이지"}
              &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
            </button>
          </div>
        </div>
      </Modal>

      {isSideMenuOpen && (
        <div className={`${styles.menuOverlay}`}>
          <div
            className=" w-[30%] h-full flex justify-end"
            onClick={closeSideMenu}
          >
            <button
              className="h-[5dvh] w-[5dvh] flex items-center justify-center text-white p-2 m-2 "
              onClick={closeSideMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg w-6 h-6 stroke-white"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>
          <div className="sideMenu w-[70%] h-full flex bg-white items-center flex-col ">
            <div className="w-full p-3 text-sz30">전체메뉴</div>
            <div className="border-b-[0.05px] w-full"></div>
            <img
              src="/assets/webp/logoBalck.webp"
              className="w-[60%] p-3 m-2"
              alt="붕어빵 탐험대 로고"
            />
            <div className="w-full flex gap-x-4 items-center justify-center pb-5">
              <button
                className=""
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/bung_crew?igsh=MTVuOTRteGhrMm1jYw==",
                    "_blank"
                  )
                }
              >
                <img
                  src="/assets/webp/instaIcon.webp"
                  className="w-8 h-8"
                  alt="붕어빵 탐험대 인스타"
                />
              </button>
              <button
                className=""
                onClick={() =>
                  window.open("https://x.com/bung_crew?s=09", "_blank")
                }
              >
                <img
                  src="/assets/webp/XIcon.webp"
                  className="w-8 h-8"
                  alt="붕어빵 탐험대 X"
                />
              </button>
            </div>
            <div className="border-b-[0.05px] w-full"></div>
            <div className="flex px-3 flex-col text-sz25 w-full py-4 gap-y-3">
              <button
                className="flex gap-x-3 w-full items-center active:scale-95 active:bg-[#fceef2] hover:bg-[#c5e7ff]"
                onClick={() => navigate("/calendarPage")}
              >
                <img
                  src="/assets/webp/calendarBtnIcon.webp"
                  className="w-8 h-8"
                />
                붕어일지
              </button>
              <button
                className="flex gap-x-3 w-full items-center active:scale-95 active:bg-[#fceef2] hover:bg-[#c5e7ff]"
                onClick={() => navigate("/bookPage")}
              >
                <img src="/assets/webp/bookBtnIcon.webp" className="w-8 h-8" />
                붕어도감
              </button>
              <button
                className="flex gap-x-3 w-full items-center active:scale-95 active:bg-[#fceef2] hover:bg-[#c5e7ff]"
                onClick={() => navigate("/map")}
              >
                <img src="/assets/webp/mapBtnIcon.webp" className="w-8 h-8" />
                붕어지도
              </button>
              <button
                className="flex gap-x-3 w-full active:scale-95 active:bg-[#fceef2] hover:bg-[#c5e7ff]"
                onClick={() => navigate("/bungBalGamePage")}
              >
                <img src="/assets/webp/bungbalIcon.webp" className="w-8 h-8" />
                붕어빵 취향 테스트
              </button>
              <button
                className="flex gap-x-3 w-full items-center active:scale-95 active:bg-[#fceef2] hover:bg-[#c5e7ff]"
                onClick={() => navigate("/debateList")}
              >
                <img src="/assets/webp/debateIcon.webp" className="w-8 h-8" />
                붕어빵 잡담소
              </button>
            </div>
            <div className="border-b-[0.05px] w-full"></div>
            <div className="flex px-3 flex-col text-sz25 w-full py-4 gap-y-3">
              <button
                className="flex gap-x-3 w-full items-center active:scale-95 active:bg-[#fceef2] hover:bg-[#c5e7ff]] "
                onClick={openModal}
              >
                <img
                  src="/assets/webp/modalIconBlack.webp"
                  className="w-8 h-8 p-1 "
                />
                튜토리얼
              </button>
              <button
                className="flex gap-x-3 w-full items-center active:scale-95 active:bg-[#fceef2] hover:bg-[#c5e7ff]"
                onClick={showNotice}
              >
                <img
                  src="/assets/webp/noticeIcon.webp"
                  className="w-8 h-8 p-1"
                />
                공지사항
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full  h-[6dvh] flex justify-between items-center bg-[#007ada] text-white px-1 pt-1">
        <button
          className="h-[6dvh] w-[6dvh] flex items-center justify-center"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-question-circle-fill w-7 h-7"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
          </svg>
        </button>
        <img
          className="h-[4dvh]"
          src="/assets/webp/logo.webp"
          alt="붕어빵 탐험대"
        />
        <button
          className="h-[6dvh] w-[6dvh] flex items-center justify-center"
          onClick={toggleSideMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list w-7 h-7 stroke-white"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
      </div>
      <div className=" flex flex-grow flex-col justify-center relative w-full h-full">
        <div className="w-full absolute top-0 bulbTop">
          <img src="/assets/webp/mainObjTop.webp" alt="mainObj top" />
        </div>
        <div className="w-full absolute bottom-0 bulbBtm">
          <img src="/assets/webp/mainObjBtm.webp" alt="mainObj bottom" />
        </div>

        <div className="top-btn-area flex absolute top-0 justify-between items-start w-full px-2 pt-3">
          <div
            className="profileArea h-[10dvh] w-[calc(10dvh_*_1277/378)] bg-cover flex flex-col justify-center text-[#9b5d24] nowrap"
            style={{
              backgroundImage: `url(/assets/webp/profile.webp)`,
            }}
          >
            <div className="text-sz35 font-bold w-full text-center">
              <span>{nickname}</span>&nbsp;님
            </div>
            <div className="relative w-full h-[2dvh]">
              <div className="bunTxtArea text-sz20 w-full text-center nowrap absolute top-[-1dvh]">
                이번달은 붕어빵을
                <span className="font-semibold">{monthlyCount}</span>번
                먹었어요!
              </div>
            </div>
          </div>
        </div>
        <div className="mid-area mb-8 px-3">
          <FishFrame />
        </div>
        <div className="btn-area w-full flex items-end absolute bottom-0 h-full justify-end">
          {!isShareMenuOpen && (
            <div className=" w-full p-3">
              <div className="w-full flex items-end justify-end gap-2">
                <button className="w-[6.7dvh]" onClick={goToMap}>
                  <img
                    src="/assets/webp/mapBtn.webp"
                    alt="share button"
                    className=""
                  />
                </button>
                <button className="w-[6.7dvh]" onClick={goToCalendar}>
                  <img
                    src="/assets/webp/calendarBtn.webp"
                    alt="calendar button"
                    className=""
                  />
                </button>
                <button className="w-[6.7dvh]" onClick={goToBook}>
                  <img
                    src="/assets/webp/bookBtn.webp"
                    alt="book button"
                    className=""
                  />
                </button>
                <button className="w-[6.7dvh]" onClick={toggleShareMenu}>
                  <img
                    src="/assets/webp/shareBtn.webp"
                    alt="share button"
                    className=""
                  />
                </button>
              </div>
            </div>
          )}
          {isShareMenuOpen && (
            <div
              className="w-full flex flex-col items-end justify-end bg-black bg-opacity-50 h-full z-20"
              onClick={closeShareMenu}
            >
              <div
                className="flex flex-col space-y-4 justify-end m-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="w-[6.7dvh] mx-auto " onClick={shareKakao}>
                  <img
                    src="/assets/webp/kakaoBtn.webp"
                    alt="share on kakao button"
                    className=""
                  />
                </button>
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
                <button
                  className="w-[6.7dvh] mx-auto "
                  onClick={handleCopyLink}
                >
                  <img
                    src="/assets/webp/linkBtn.webp"
                    alt="copy link button"
                    className=""
                  />
                </button>
                <button
                  className="w-[6.7dvh] mx-auto "
                  onClick={closeShareMenu}
                >
                  <img
                    src="/assets/webp/returnBtn.webp"
                    alt="copy link button"
                    className=""
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
