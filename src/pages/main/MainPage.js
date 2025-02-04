import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./MainPage.module.css";
import Modal from "../../components/modals/Modal.js";
import modalStyles from "../../components/modals/Modal.module.css";

import tutorialPages from "../../components/modals/TutorialData.js";
import {
  fetchUserData,
  fetchMainPageData,
  updateFirstLogin,
} from "../../api/service.js";
import { useDispatch, useSelector } from "react-redux"; //Redux Store에서 가져오기
import { setNickname } from "../../redux/slices/user.js"; // Redux 액션 가져오기

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

        setEatenDays(response.data.daysInWeek);
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
    if (eatenDays[todayEnglish]) { //키가 존재하는지 확인
      alert("오늘은 이미 붕어빵을 등록하셨습니다!");
      return;
    }
    // 버튼 클릭 시 sessionStorage에 플래그 저장
    sessionStorage.setItem("addPageAllowed", "true");
    navigate("/register/addPage");
  };

  const frameRef = useRef(null);
  const [radius, setRadius] = useState(0);
  const [imageSize, setImageSize] = useState(0);

  const weekDays = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];

  const calculateSizes = () => {
    if (frameRef.current) {
      const frameWidth = frameRef.current.offsetWidth;
      setRadius(frameWidth / 3.8);
      setImageSize(frameWidth / 4.15);
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
        console.log(`${day} 클릭됨, ID: ${id}`);
        navigate(`/detail/${id}`);
      } else {
        console.log(`${day} 클릭됨, 등록된 데이터 없음`);
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
                : "/assets/webp/goToRegisterBtn_red.webp" // 등록 아직 안되었을 때 (빨간색)
            }
            alt="icon"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 상태
  const dispatch = useDispatch(); // Redux 디스패치

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false); // 메뉴 닫기
  };

  const goToCalendar = () => {
    navigate("/CalendarPage");
  };
  const goToBook = () => {
    navigate("/BookPage");
  };

  const handleCaptureAndDownload = async () => {
    try {
      setIsMenuOpen(false); // 메뉴 닫기

      // 캡처 대상 설정
      const element = document.querySelector(".main-area");
      const bulbTopBlur = document.querySelector(".bulbTopBlur");
      const bulbTop = document.querySelector(".bulbTop");

      const originalBackgroundImage = element.style.backgroundImage;
      element.style.backgroundImage =
        "url(/assets/webp/glitter.webp), url(/assets/webp/checkPatternMerged.webp)";

      const btnArea = document.querySelector(".btn-area");
      if (btnArea) btnArea.style.display = "none";
      if (bulbTop) bulbTop.style.display = "none";
      if (bulbTopBlur) bulbTopBlur.style.display = "none";

      // html2canvas로 캡처
      const canvas = await html2canvas(element);

      element.style.backgroundImage = originalBackgroundImage;

      if (btnArea) btnArea.style.display = "";
      if (bulbTop) bulbTop.style.display = "";
      if (bulbTopBlur) bulbTopBlur.style.display = "";

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
      alert("화면 캡처 중 오류가 발생했습니다.");
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
  };

  const handleNext = () => {
    if (currentPage === tutorialPages.length - 1) {
      alert("마지막 페이지 입니다!");
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, tutorialPages.length - 1));
    }
  };

  const handlePrev = () => {
    if (currentPage === 0) {
      alert("첫 페이지 입니다!");
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
            console.log("First login status updated:", response);
          } catch (error) {
            console.error("Failed to update first login status:", error);
          }
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const closeModal = () => setModalOpen(false);

  return (
    <div
      className="main-area flex flex-grow flex-col justify-center relative w-full h-full bg-cover"
      style={{
        backgroundImage: `url(/assets/webp/glitter.webp), url(/assets/webp/checkPattern.webp)`,
      }}
    >
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
              className={`flex items-center text-sz25 ${currentPage === 0 ? "text-gray-500" : "text-[#650000]"
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
              className={`flex items-center text-sz25 ${currentPage === tutorialPages.length - 1
                ? "text-gray-500"
                : "text-[#650000]"
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
            {/* <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, tutorialPages.length - 1)
                )
              }
            >
              {currentPage === tutorialPages.length - 1
                ? "Finish"
                : "다음 페이지"}
            </button> */}
          </div>
        </div>
      </Modal>
      <div
        className={`w-full absolute top-0 absolute ${styles["soft-blink"]} bulbTopBlur`}
      >
        <img src="/assets/webp/bulbTopBlur.webp" alt="bulb bottom" />
      </div>
      <div className="w-full absolute top-0 bulbTop">
        <img src="/assets/webp/bulbTop.webp" alt="bulb bottom" />
      </div>
      <div
        className={`w-full absolute bottom-0 absolute ${styles["soft-blink"]} BulbBtmBlur`}
      >
        <img src="/assets/webp/bulbBtmBlur.webp" alt="bulb bottom" />
      </div>
      <div className="w-full absolute bottom-0 bulbBtm">
        <img src="/assets/webp/bulbBtm.webp" alt="bulb bottom" />
      </div>

      <div className="top-btn-area flex absolute top-0 justify-start">
        <button
          className="m-[2dvh] text-white bg-[#650000] rounded-full z-10"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 w-[5dvh] h-[5dvh]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </button>
      </div>
      <div className="mid-area mb-8">
        <div className="text-[#fffed6]">
          {/* <div className="text-sz20">
            <span className="text-point-color font-semibold">Lv.1</span>
            <span className="ps-1">미니붕어</span>
          </div> */}
          <div className="text-name font-bold pt-1 drop-shadow-xlRedLight">
            <span>{nickname}님</span>
          </div>
          <div className="text-sz20 drop-shadow-smRed">
            이번달은 붕어빵을{" "}
            <span className="font-semibold">{monthlyCount}</span>번 먹었어요!
          </div>
        </div>
        <FishFrame />
      </div>
      <div className="btn-area w-full flex flex-col items-end absolute bottom-0 h-full justify-end">
        {!isMenuOpen && (
          <button className="w-[12dvh] m-[2dvh]" onClick={toggleMenu}>
            <img
              src="/assets/webp/menuBtn.webp"
              alt="menu"
              className="drop-shadow-smGray"
            />
          </button>
        )}
        {isMenuOpen && (
          <div
            className="w-full flex flex-col items-end justify-end bg-black bg-opacity-50 h-full z-20"
            onClick={closeMenu}
          >
            <div
              className="flex flex-col space-y-4 justify-end m-[2dvh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="w-[12dvh] mx-auto drop-shadow-smGray"
                onClick={handleCaptureAndDownload}
              >
                <img
                  src="/assets/webp/captureBtn.webp"
                  alt="capture button"
                  className=""
                />
              </button>
              <button
                className="w-[12dvh] mx-auto drop-shadow-smGray"
                onClick={goToCalendar}
              >
                <img
                  src="/assets/webp/calendarBtn.webp"
                  alt="calendar button"
                  className=""
                />
              </button>
              <button
                className="w-[12dvh] mx-auto drop-shadow-smGray"
                onClick={goToBook}
              >
                <img
                  src="/assets/webp/bookBtn.webp"
                  alt="book button"
                  className=""
                />
              </button>
              <button
                className="relative w-[7dvh] h-[7dvh] flex items-center justify-center ms-auto drop-shadow-smGray"
                onClick={closeMenu}
              >
                {/* 배경 이미지 */}
                <img
                  src="/assets/webp/btnBg.webp"
                  alt="close button"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* SVG 아이콘 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-white z-10 size-8"
                  alt="close svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
