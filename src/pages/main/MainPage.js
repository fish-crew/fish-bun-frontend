import bunFrameEmpty from "../../assets/bun-frame-empty.png";
import bunFrameFilled from "../../assets/bun-frame-filled.png";
import bunFrame from "../../assets/bun-frame.png";
import goToRegisterBtn from "../../assets/goToRegisterBtn.png";
import React, { useRef, useState, useEffect } from "react";

function FishFrame() {
  const frameRef = useRef(null);
  const [radius, setRadius] = useState(0);
  const [imageSize, setImageSize] = useState(0);

  const weekDays = ["화", "수", "목", "금", "토", "일", "월"];
  const eatenDays = ["월", "수", "목"];

  const calculateSizes = () => {
    if (frameRef.current) {
      const frameWidth = frameRef.current.offsetWidth;
      setRadius(frameWidth / 3.3);
      setImageSize(frameWidth / 3.8);
    }
  };

  useEffect(() => {
    calculateSizes();
    window.addEventListener("resize", calculateSizes);
    return () => window.removeEventListener("resize", calculateSizes);
  }, []);

  return (
    <div className="p-8">
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
              <div
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `${baseTransform} translate(${
                    radius * 1.3
                  }px) rotate(${-angle}deg)`,
                }}
              >
                <p className="text-center text-2xl font-bold text-[#2a2523]">
                  {day}
                </p>
              </div>
            </React.Fragment>
          );
        })}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
  return (
    <div className="flex flex-grow flex-col justify-between">
      <div></div>
      <div className="mid-area">
        <div>
          <div className="text-sm">
            <span className="text-point-color font-semibold">Lv.1</span>
            <span className="ps-1">미니붕어</span>
          </div>
          <div className="text-3xl font-bold py-1">사용자 이름</div>
          <div className="text-sm">
            이번달은 <span className="text-point-color font-semibold">13</span>
            일 동안 붕어빵을 먹었어요!
          </div>
        </div>
      </div>
      <FishFrame />
      <div className="btn-area">버튼들 들어갈 영역</div>
    </div>
  );
}

export default Main;
