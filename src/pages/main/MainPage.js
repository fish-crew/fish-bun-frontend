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
import bookImg from "../../assets/captureBtn.png";
import checkPattern from "../../assets/checkPattern.png";
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
      setImageSize(frameWidth / 3.9);
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
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
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
                  className="object-cover"
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
      <div className="btn-area w-full flex flex-col items-end absolute bottom-0">
        <button
          className="m-1.5 mr-2 w-[12dvh]"
          onClick={handleCaptureAndDownload}
        >
          <img src={captureBtn} alt="icon" className="p-2.5" />
        </button>
        <button className="m-1.5 mr-2 w-[12dvh]" onClick={goToCalendar}>
          <img src={calendarBtn} alt="icon" className="p-2.5" />
        </button>
        <button className="m-1.5 mr-2 mb-4 w-[12dvh]" onClick={goToBook}>
          <img src={bookImg} alt="icon" className="p-2.5" />
        </button>
      </div>
    </div>
  );
}

export default Main;
