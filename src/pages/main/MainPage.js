import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./MainPage.module.css";

import { fetchUserData, fetchMainPageData } from "../../api/service.js";
import { useDispatch } from "react-redux";
import { setNickname } from "../../redux/slices/user.js"; // Redux 액션 가져오기
import { useSelector } from "react-redux"; //Redux Store에서 가져오기

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
        alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  //서버에서 main 페이지에 사용할 코드 받아오기
  const [eatenDays, setEatenDays] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMainPageData(); // 서버 데이터 가져오기

        // 요일 매핑 객체
        const dayMapping = {
          Sunday: "일",
          Monday: "월",
          Tuesday: "화",
          Wednesday: "수",
          Thursday: "목",
          Friday: "금",
          Saturday: "토",
        };

        // 영어 요일을 한국어로 변환
        const convertedDays = response.data.daysInWeek.map(
          (day) => dayMapping[day]
        );

        // 상태 업데이트
        setEatenDays(convertedDays);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const today = new Date();
  const dayMapping = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };
  const todayKorean = dayMapping[today.getDay()]; // 오늘 요일 (한국어)

  const goToAdd = () => {
    if (eatenDays.includes(todayKorean)) {
      alert("오늘은 이미 붕어빵을 등록하셨습니다!");
      return;
    }
    navigate("/register/addPage");
  };

  const frameRef = useRef(null);
  const [radius, setRadius] = useState(0);
  const [imageSize, setImageSize] = useState(0);

  const weekDays = ["화", "수", "목", "금", "토", "일", "월"];

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
          const imageSrc = eatenDays.includes(day)
            ? "/assets/webp/bun-frame-filled.webp"
            : "/assets/webp/bun-frame-empty.webp";

          return (
            <React.Fragment key={day}>
              <div
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `${baseTransform} translate(${radius}px)`,
                }}
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
            src="/assets/webp/goToRegisterBtn.webp"
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

      // 캡처 제외할 요소 숨기기
      const btnArea = document.querySelector(".btn-area");
      if (btnArea) btnArea.style.display = "none";

      // html2canvas로 캡처
      const canvas = await html2canvas(element);

      // 숨긴 요소 복원
      if (btnArea) btnArea.style.display = ""; // 원래 상태로 복원

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMainPageData(); // 서버 데이터 가져오기
        const monthlyCnt = response.data.monthlyCount;
        setMonthlyCount(monthlyCnt);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const randomDuration = () => {
    return `${Math.random() * 1 + 1}s`; // 1초에서 4초 사이 랜덤 시간
  };

  return (
    <div
      className="main-area flex flex-grow flex-col justify-center relative w-full h-full bg-cover"
      style={{
        backgroundImage: `url(/assets/webp/glitter.webp), url(/assets/webp/checkPattern.webp)`,
      }}
    >
      <div
        className={`w-full absolute top-0 w-[88%] absolute ${styles["soft-blink"]}`}
      >
        <img src="/assets/webp/bulbTopBlur.webp" alt="bulb bottom" />
      </div>
      <div className="w-full absolute top-0">
        <img src="/assets/webp/bulbTop.webp" alt="bulb bottom" />
      </div>
      <div
        className={`w-full absolute bottom-0 w-[88%] absolute ${styles["soft-blink"]}`}
      >
        <img src="/assets/webp/bulbBtmBlur.webp" alt="bulb bottom" />
      </div>
      <div className="w-full absolute bottom-0">
        <img src="/assets/webp/bulbBtm.webp" alt="bulb bottom" />
      </div>
      <div className="mid-area mb-8">
        <div className="text-[#fffed6]">
          {/* <div className="text-sz20">
            <span className="text-point-color font-semibold">Lv.1</span>
            <span className="ps-1">미니붕어</span>
          </div> */}
          <div className="text-name font-bold pt-1 drop-shadow-xlRedLight">
            <span>{nickname}dfgdfgdfg님</span>
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
