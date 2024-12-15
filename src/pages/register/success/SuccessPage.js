import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import findMessage from '../../../assets/findMessage.png';
import foundedBun from '../../../assets/foundedBun.png';
import unknownBunMessage from '../../../assets/unknownBunMessage.png';
import paperOnCheckT from "../../../assets/paperOnCheckT.jpg";
import paperOnCheckB from '../../../assets/paperOnCheckB.jpg';

function SuccessPage() {
  const navigate = useNavigate();

  //임시 데이터터
  const fishBreadData = [
    { id: 1, name: '미확인 붕어빵' },
    { id: 2, name: '달콤한 붕어빵' },
    { id: 3, name: '초코 붕어빵' },
    { id: 1, name: '미확인 붕어빵' },
    { id: 2, name: '달콤한 붕어빵' },
    { id: 3, name: '초코 붕어빵' },
  ];

  const handleReport = async () => {
    navigate('/register/reportPage');
  };

  const handleConfirm = async () => {
    navigate('/main');
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-full overflow-auto">
      <div className="w-full h-max">
        <img src={paperOnCheckT} alt="상단 배너" />
      </div>
      <div
        className="w-full flex flex-col flex-grow bg-cover pb-3 "
        style={{ backgroundImage: `url(${paperOnCheckB})` }}
      >
        <div className="flex justify-center items-center">
          <img
            src={findMessage}
            alt="findMessage"
            className="h-[17dvh] pt-9 pb-5"
          />
        </div>
        <div className="relative justify-center w-full overflow-hidden mb-5">
          {/* Swiper 슬라이더 */}
          <Swiper
            //spaceBetween={10} // 슬라이드 간의 간격
            slidesPerView="auto"// 슬라이드의 크기를 자동으로 설정
            centeredSlides={true} // 현재 슬라이드를 화면 가운데로 설정
            pagination={{ clickable: true }} // 페이지네이션 추가
          >
            {fishBreadData.map((item) => (
              <SwiperSlide key={item.id} style={{ width: '225px', paddingLeft: '20px', marginLeft: '25px' }}> {/*이거 무조건 이렇게 설정해야 안 틀어짐*/}
                {/* 슬라이드 크기를 명시적으로 지정 */}
                <div className="flex flex-col items-center w-40">
                  <div className="w-60 h-60 bg-transparent rounded-lg flex items-center justify-center">
                    {/* <span className="text-lg font-bold">{item.id}</span> */}
                    <img
                      src={foundedBun}
                      alt="findMessage"
                      className="w-60 h-60"
                    />
                  </div>
                  {item.name === '미확인 붕어빵' ? (
                    <div className="mt-5 w-72">
                      <img
                        src={unknownBunMessage} // 미확인 붕어빵 전용 이미지
                        alt="미확인 붕어빵"
                        className="w-full h-[10dvh]"
                      />
                    </div>
                  ) : (
                    <div className="mt-5 text-center text-sz40">{item.name}</div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* 미확인 붕어빵 있을 때 버튼 다르게게 */}
        <div className="flex justify-center">
          {fishBreadData.map(item => item.name).includes('미확인 붕어빵') ? (
            <button
              className=" bg-[#630000] hover:bg-white hover:text-[#630000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
              onClick={handleReport}
            >
              제보하기
            </button>
          ) : (
            <button
              className="mt-4 bg-[#630000] hover:bg-white hover:text-[#630000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
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
