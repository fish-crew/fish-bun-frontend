import React, { useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./BookPage.module.css";

function CustomArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
      }}
      onClick={onClick}
    />
  );
}

function BookPage() {
  const [activeIndex, setActiveIndex] = useState(0); // 현재 활성화된 캐러셀 인덱스 상태 관리
  const navigate = useNavigate();
  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate("/main");
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    beforeChange: (_, next) => setActiveIndex(next), // 슬라이드 변경 시 인덱스 업데이트
    customPaging: (i) => {
      // 현재 dot의 인덱스와 activeIndex를 비교하여 활성화 상태를 구분
      if (i === activeIndex) {
        return (
          <img
            src="/assets/webp/dots.webp"
            alt={`Dot ${i + 1}`}
            className={styles.activeDot}
          />
        );
      }
      return <button className={styles.defaultDot}></button>;
    },
    appendDots: (dots) => (
      <div>
        <ul className={styles.dotsContainer}>{dots}</ul>
      </div>
    ),
  };

  const flavors = [
    { id: 1, flavor: "팥 붕어빵" },
    { id: 2, flavor: "슈크림 붕어빵" },
    { id: 3, flavor: "피자 붕어빵" },
    { id: 4, flavor: "고구마 붕어빵" },
    { id: 5, flavor: "타코야끼 붕어빵" },
    { id: 6, flavor: "두부 붕어빵" },
    { id: 7, flavor: "애플파이 붕어빵" },
    { id: 8, flavor: "뿌링클 붕어빵" },
    { id: 9, flavor: "초코 붕어빵" },
    { id: 10, flavor: "망고 붕어빵" },
    { id: 11, flavor: "치즈 붕어빵" },
  ];

  const colctedFish = [1, 2, 4, 6, 10]; // 수집된 붕어빵 ID

  const nickname = "붕어빵 탐험대";

  // 붕어빵 데이터를 9개씩 나누기
  const chunkedFlavors = [];
  for (let i = 0; i < flavors.length; i += 9) {
    chunkedFlavors.push(flavors.slice(i, i + 9));
  }

  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="w-full h-max">
        <img src="/assets/webp/paperOnCheckT.webp" alt="상단 배너" />
      </div>
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-[#650000] hover:bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white stroke-[3px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div
        className="w-full flex flex-col flex-grow bg-cover whitespace-nowrap"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}
      >
        <div className="w-full text-sz45 md:text-sz40 text-center pt-3">
          <span className="whitespace-nowrap text-point-color">{nickname}</span>
          의 붕어 도감
        </div>

        {/* 캐러셀 */}
        <div className="flex flex-col flex-grow px-9 justify-between carousel">
          <div className="{styles.container} flex flex-col flex-grow">
            <Slider {...settings}>
              {chunkedFlavors.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="h-full flex items-center justify-center rounded-md"
                >
                  <div className="grid grid-cols-3 grid-rows-3 gap-4">
                    {page.map((fish) => (
                      <div
                        key={fish.id}
                        className={`flex flex-col items-center justify-center h-max ${
                          colctedFish.includes(fish.id)
                            ? "opacity-100"
                            : "opacity-25"
                        }`}
                      >
                        <img
                          src={`/assets/webp/flavorIcons/${fish.id}.webp`}
                          alt={fish.flavor}
                          className="w-[75%] aspect-[1/1]"
                        />
                        <span className="whitespace-pre-wrap">
                          {fish.flavor}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
