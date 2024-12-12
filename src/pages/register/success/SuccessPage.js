import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import findMessage from '../../../assets/findMessage.png';

function SuccessPage() {
  const fishBreadData = [
    { id: 1, name: '미확인 붕어빵' },
    { id: 2, name: '달콤한 붕어빵' },
    { id: 3, name: '초코 붕어빵' },
  ];

  return (
    <div className="flex flex-col justify-start items-center h-screen mt-5">
      <img
        src={findMessage}
        alt="findMessage"
        className="w-30 h-[10dvh] m-4"
      />
      <div className="relative w-full overflow-hidden">
        {/* Swiper 슬라이더 */}
        <Swiper
          //spaceBetween={10} // 슬라이드 간의 간격
          slidesPerView="auto"// 슬라이드의 크기를 자동으로 설정
          centeredSlides={true} // 현재 슬라이드를 화면 가운데로 설정
          pagination={{ clickable: true }} // 페이지네이션 추가
        >
          {fishBreadData.map((item) => (
            <SwiperSlide key={item.id} style={{ width: '200px', paddingLeft: '20px' }}> {/*이거 무조건 이렇게 설정해야 */}
              {/* 슬라이드 크기를 명시적으로 지정 */}
              <div className="flex flex-col items-center w-40">
                <div className="w-40 h-40 bg-yellow-300 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold">{item.id}</span>
                </div>
                <span className="mt-2 text-center text-sm">{item.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SuccessPage;
