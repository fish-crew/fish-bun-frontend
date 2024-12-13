import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

import bunFrameEmpty from "../../assets/bun-frame-empty.png";
import bunFrameFilled from "../../assets/bun-frame-filled.png";
import bunFrame from "../../assets/bun-frame.png";
import goToRegisterBtn from "../../assets/goToRegisterBtn.png";
import menuBtn from "../../assets/menuBtn.png";
import calendarBtn from "../../assets/calendarBtn.png";
import captureBtn from "../../assets/captureBtn.png";
import bookBtn from "../../assets/bookBtn.png";
import btnBg from "../../assets/btnBg.png";
import checkPattern from "../../assets/checkPattern.png";
import bulbBtm from "../../assets/bulbBtm.png";
import bulbFull from "../../assets/bulbFull.png";
import glitter from "../../assets/glitter.png";

function FishFrame() {
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate("/register/addPage");
  };

  const frameRef = useRef(null);
  const [radius, setRadius] = useState(0);
  const [imageSize, setImageSize] = useState(0);

  const weekDays = ["화", "수", "목", "금", "토", "일", "월"];
  const eatenDays = ["월", "수", "목"];

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
          style={{ backgroundImage: `url(${bunFrame})` }}
        ></div>
        {weekDays.map((day, index) => {
          const angle = (360 / weekDays.length) * index;
          const baseTransform = `translate(-50%, -50%) rotate(${angle}deg)`;
          const imageSrc = eatenDays.includes(day)
            ? bunFrameFilled
            : bunFrameEmpty;

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
            src={goToRegisterBtn}
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
      // 캡처 대상 설정
      const element = document.body;

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
      const fileName = `bunlog-${year}-${month}-${date}-${hours}-${minutes}.png`;

      // 다운로드 링크 생성
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("캡처 오류:", error);
      alert("이미지 캡처 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="flex flex-grow flex-col justify-center relative w-full h-full bg-cover"
      style={{
        backgroundImage: `url(${bulbFull}), url(${glitter}), url(${checkPattern})`,
      }}
    >
      <div className="w-full absolute bottom-0">
        <img src={bulbBtm} alt="bulb bottom" className="" />
      </div>
      <div className="mid-area mb-8">
        <div className="text-[#fffed6]">
          {/* <div className="text-sz20">
            <span className="text-point-color font-semibold">Lv.1</span>
            <span className="ps-1">미니붕어</span>
          </div> */}
          <div className="text-name font-bold pt-1 drop-shadow-xlRedLight">
            사용자 이름
          </div>
          <div className="text-sz20 drop-shadow-smRed">
            이번달은 <span className="font-semibold">13</span>일 동안 붕어빵을
            먹었어요!
          </div>
        </div>
        <FishFrame />
      </div>
      <div className="btn-area w-full flex flex-col items-end absolute bottom-0 h-full justify-end">
        {!isMenuOpen && (
          <button className="w-[12dvh] m-[2dvh]" onClick={toggleMenu}>
            <img src={menuBtn} alt="icon" className="drop-shadow-smGray" />
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
                <img src={captureBtn} alt="capture button" className="" />
              </button>
              <button
                className="w-[12dvh] mx-auto drop-shadow-smGray"
                onClick={goToCalendar}
              >
                <img src={calendarBtn} alt="calendar button" className="" />
              </button>
              <button
                className="w-[12dvh] mx-auto drop-shadow-smGray"
                onClick={goToBook}
              >
                <img src={bookBtn} alt="book button" className="" />
              </button>
              <button
                className="relative w-[7dvh] h-[7dvh] flex items-center justify-center ms-auto drop-shadow-smGray"
                onClick={closeMenu}
              >
                {/* 배경 이미지 */}
                <img
                  src={btnBg}
                  alt="capture button"
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
