import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import findMessage from "../../../assets/findMessage.png";
import foundedBun from "../../../assets/foundedBun.png";
import unknownBunMessage from "../../../assets/unknownBunMessage.png";
import paperOnCheckT from "../../../assets/paperOnCheckT.jpg";
import paperOnCheckB from "../../../assets/paperOnCheckB.jpg";

function SuccessPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); // 현재 활성화된 슬라이드 인덱스

  const fishBreadData = [
    { id: 1, name: "미확인 붕어빵" },
    { id: 2, name: "블루베리 크림치즈 붕어빵" },
    { id: 3, name: "팥 붕어빵" },
    { id: 1, name: "슈크림 붕어빵" },
    { id: 2, name: "피자 붕어빵" },
    { id: 3, name: "초코 붕어빵" },
  ];

  const handleReport = () => {
    navigate("/register/reportPage");
  };

  const handleConfirm = () => {
    navigate("/main");
  };

  return (
    <div className="flex flex-col justify-around items-center w-full h-full overflow-auto">
      <div className="w-full h-max">
        <img src={paperOnCheckT} alt="상단 배너" />
      </div>
      <div
        className="w-full flex flex-col flex-grow bg-cover justify-around"
        style={{ backgroundImage: `url(${paperOnCheckB})` }}
      >
        <div className="flex justify-center items-center h-[9dvh]">
          <img
            src={findMessage}
            alt="findMessage"
            className="animate__animated animate__tada h-full w-auto"
          />
        </div>
        <div className="relative justify-center w-full overflow-hidden">
          {/* Swiper 슬라이더 */}
          <Swiper
            slidesPerView="auto"
            centeredSlides={true}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // 활성화된 슬라이드 인덱스 업데이트
            onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)} // 초기 활성화 슬라이드 설정
          >
            {fishBreadData.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "225px",
                  paddingLeft: "20px",
                  marginLeft: "25px",
                  transition: "transform 0.3s ease-in-out",
                  transform: activeIndex === index ? "scale(1)" : "scale(0.8)", // 활성 슬라이드는 기본 크기, 나머지는 축소
                  opacity: activeIndex === index ? 1 : 0.5, // 비활성 슬라이드 투명도 조정
                }}
              >
                <div className="flex flex-col items-center w-40">
                  <div className="w-52 h-52 md:w-56 md:h-56 bg-transparent rounded-lg flex items-center justify-center">
                    <img
                      src={foundedBun}
                      alt="findMessage"
                      className="w-52 h-52 md:w-56 md:h-56"
                    />
                  </div>
                  {item.name === "미확인 붕어빵" ? (
                    <div
                      className="pt-5 w-72 relative"
                      style={{
                        visibility:
                          activeIndex === index ? "visible" : "hidden", // 활성 슬라이드만 보이도록 설정
                        opacity: activeIndex === index ? 1 : 0, // 부드러운 전환을 위해 투명도 추가
                        transition:
                          "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out", // 전환 효과
                      }}
                    >
                      <div
                        className="whitespace-nowrap text-white absolute text-sz30 font-bold font-kyoboHand"
                        style={{
                          top: "58%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                        }}
                      >
                        {fishBreadData[activeIndex]?.name || "이름 없음"}
                      </div>
                      <img
                        src={unknownBunMessage}
                        alt="미확인 붕어빵"
                        className="w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div
                      className="pt-5 w-72 relative"
                      style={{
                        visibility:
                          activeIndex === index ? "visible" : "hidden", // 활성 슬라이드만 보이도록 설정
                        opacity: activeIndex === index ? 1 : 0, // 부드러운 전환을 위해 투명도 추가
                        transition:
                          "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out", // 전환 효과
                      }}
                    >
                      <div
                        className="whitespace-nowrap text-white absolute text-sz30 font-bold font-kyoboHand"
                        style={{
                          top: "58%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                        }}
                      >
                        {fishBreadData[activeIndex]?.name || "이름 없음"}
                      </div>
                      <img
                        src={unknownBunMessage}
                        alt="미확인 붕어빵"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center">
          {fishBreadData[activeIndex]?.name === "미확인 붕어빵" ? (
            <button
              className="bg-[#630000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz30 tracking-[.25em]"
              onClick={handleReport}
            >
              제보하기
            </button>
          ) : (
            <button
              className="bg-[#630000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
              onClick={handleConfirm}
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
