import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  fetchRegisterSuccessPageData,
  fetchFlavorData,
} from "../../../api/service.js";

function SuccessPage() {
  const { id } = useParams(); // 경로에서 id 가져오기
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); // 현재 활성화된 슬라이드 인덱스
  const [animationTrigger, setAnimationTrigger] = useState(true); // 애니메이션 트리거 상태 (초기값 true)

  const [foundData, setFoundData] = useState([]);
  useEffect(() => {
    const getFoundFlavors = async () => {
      try {
        const successPageResponse = await fetchRegisterSuccessPageData(id); // 서버 전체 응답
        const flavorId = successPageResponse.data.map((item) => item.flavorId);

        const allFlavors = await fetchFlavorData();
        const foundData = allFlavors.data.filter((item) =>
          flavorId.includes(item.id)
        );
        const sortedData = foundData.sort((a, b) => a.seq - b.seq);
        setFoundData(sortedData);
        console.log(foundData);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    getFoundFlavors();
  }, []);

  const handleReport = () => {
    navigate("/register/reportPage");
  };

  const handleConfirm = () => {
    navigate("/main");
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex); // 활성 슬라이드 변경
    resetAnimation(); // 애니메이션 재적용
  };

  const handleSlideClick = (index) => {
    if (index === activeIndex) {
      resetAnimation(); // 활성 슬라이드 클릭 시 애니메이션 재적용
    } else {
      setActiveIndex(index); // 활성화된 슬라이드 변경
      resetAnimation(); // 새 활성 슬라이드에 애니메이션 적용
    }
  };

  const resetAnimation = () => {
    setAnimationTrigger(false); // 애니메이션 비활성화
    setTimeout(() => setAnimationTrigger(true), 50); // 애니메이션 재적용
  };

  return (
    <div className="flex flex-col justify-around items-center w-full h-full overflow-auto">
      <div className="w-full h-max">
        <img src="/assets/webp/paperOnCheckT.webp" alt="상단 배너" />
      </div>
      <div
        className="w-full flex flex-col flex-grow bg-cover justify-around"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}
      >
        <div className="relative justify-center w-full overflow-hidden">
          <div className="flex justify-center items-center h-[9dvh] pt-2">
            <img
              src="/assets/webp/findMessage.webp"
              alt="findMessage"
              className="animate__animated animate__tada h-full w-auto"
            />
          </div>
          {/* Swiper 슬라이더 */}
          <Swiper
            slidesPerView="auto"
            centeredSlides={true}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange} // 활성화된 슬라이드 변경
            onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)} // 초기 활성화 슬라이드 설정
          >
            {foundData.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "225px",
                  paddingLeft: "20px",
                  marginLeft: "25px",
                  paddingTop: "35px",
                  transition: "transform 0.3s ease-in-out",
                  transform: activeIndex === index ? "scale(1)" : "scale(0.8)", // 활성 슬라이드는 기본 크기, 나머지는 축소
                  opacity: activeIndex === index ? 1 : 0.5, // 비활성 슬라이드 투명도 조정
                }}
                onClick={() => handleSlideClick(index)} // 슬라이드 클릭 핸들러
              >
                <div className="flex flex-col items-center w-40">
                  <div className="w-48 h-48 md:w-52 md:h-52 bg-transparent rounded-lg flex items-center justify-center overflow-visible">
                    <img
                      src={(() => {
                        try {
                          return require(`/assets/webp/flavorIcons/${item.iconCode}.png`);
                        } catch {
                          return "/assets/webp/flavorIcons/notYet.webp";
                        }
                      })()}
                      alt={item.flavor}
                      className={`w-full h-full object-contain ${
                        activeIndex === index && animationTrigger
                          ? "animate__animated animate__bounce"
                          : ""
                      }`} // 활성 슬라이드의 이미지에만 애니메이션 클래스 추가
                    />
                  </div>

                  <div
                    className="pt-5 w-72 relative"
                    style={{
                      visibility: activeIndex === index ? "visible" : "hidden", // 활성 슬라이드만 보이도록 설정
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
                      {foundData[activeIndex]?.flavor || "이름 없음"}
                    </div>
                    <img
                      src="/assets/webp/unknownBunMessage.webp"
                      alt="미확인 붕어빵"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center">
          {foundData[activeIndex]?.flavor === "미확인 붕어빵" ? (
            <button
              className="bg-[#7f5b41] text-white border-4 font-bold py-1 px-6 rounded-full w-64 text-sz30 tracking-[.25em]"
              onClick={handleReport}
            >
              제보하기
            </button>
          ) : (
            <button
              className="bg-[#7f5b41] text-white border-4 font-bold py-1 px-6 rounded-full w-64 text-sz30 tracking-[.25em]"
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
