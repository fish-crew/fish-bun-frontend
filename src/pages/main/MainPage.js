import bunFrameEmpty from "../../assets/bun-frame-empty.png";
import bunFrameFilled from "../../assets/bun-frame-filled.png";
import bunFrame from "../../assets/bun-frame.png";
import Header from "../../components/header/Header";
import React, { useRef, useState, useEffect } from "react";

function Main() {
  const frameRef = useRef(null);
  const [radius, setRadius] = useState(0);
  const [imageSize, setImageSize] = useState(0);

  // 화면 크기 변경 시 업데이트 함수
  const updateSizes = () => {
    if (frameRef.current) {
      const frameWidth = frameRef.current.offsetWidth;
      setRadius(frameWidth / 3.3); // 반지름 계산
      setImageSize(frameWidth / 3.8); // 이미지 크기 계산
    }
  };

  useEffect(() => {
    // 초기 크기 설정
    updateSizes();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", updateSizes);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  return (
    <div className="flex flex-grow flex-col justify-between">
      <div></div>
      <div className="mid-area">
        <div className="">
          <div className="text-sm">
            <span className="text-point-color font-semibold">
              Lv.<span className="">1</span>
            </span>
            <span className="ps-1">미니붕어</span>
          </div>
          <div className="text-3xl font-bold py-1">사용자 이름</div>
          <div className="text-sm">
            이번달은 <span className="text-point-color font-semibold">13</span>
            일동안 붕어빵을 먹었어요!
          </div>
        </div>
        <div className="p-8">
          <div
            ref={frameRef}
            className="frame-area relative w-full aspect-[1/1]"
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${bunFrame})` }}
            ></div>

            <div className="fish-images-wrap">
              {Array.from({ length: 7 }).map((_, index) => {
                const angle = (360 / 7) * index;
                const transformStyle = {
                  transform: `
                    translate(-50%, -50%) 
                    rotate(${angle}deg) 
                    translate(${radius}px) 
                  `,
                };

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2"
                    style={transformStyle}
                  >
                    <img
                      src={bunFrameFilled}
                      alt={`fish-${index + 1}`}
                      style={{
                        width: `${imageSize}px`,
                        height: `${imageSize}px`,
                      }}
                      className="rounded-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="btn-area">버튼들 들어갈 영역</div>
    </div>
  );
}

export default Main;
