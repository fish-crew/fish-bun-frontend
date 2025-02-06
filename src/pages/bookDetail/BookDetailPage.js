import React, { useState, useEffect } from "react";
import { fetchBookDetailData } from "../../api/service.js";
import { useParams, useNavigate } from "react-router-dom";
import CloseButton from './../../components/Buttons/CloseButton';

const BookDetailPage = () => {
  const { flavorId } = useParams(); // URL에서 flavorId 가져오기
  const [dateList, setDateList] = useState([]); // 날짜별 데이터 저장
  const [fishBunFlavor, setFishBunFlavor] = useState(null); // 붕어빵 맛 데이터 저장
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBookDetailData(flavorId);

        if (response.result === "success" && response.statusCode === "200") {
          setDateList(response.data.dateList); // 날짜별 데이터 저장
          setFishBunFlavor(response.data.fishBunFlavor); // 붕어빵 맛 데이터 저장
        } else {
          console.error("서버 응답 실패:", response);
          alert("데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
      }
    };

    if (flavorId) {
      fetchData();
    }
  }, [flavorId]); // flavorId가 변경될 때마다 실행

  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate(-1);
  };

  return (
    <div className="w-full flex-grow flex flex-col overflow-y-auto">
      <div className="w-full h-max">
        <img src="/assets/webp/paperOnCheckT.webp" alt="상단 배너" />
      </div>
      <CloseButton onClick={handleClose} />
      <div
        className="items-center justify-center px-4"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}>
        {fishBunFlavor ? (
          <div className="py-4 w-full">
            <div className="text-center text-sz40 pb-1">{fishBunFlavor.flavor}</div>
            {/* 하이라이트 */}
            <div className="text-center text-sz22 text-yellow-600 px-6">{fishBunFlavor.highlight}</div>

            <div className="w-full px-6 py-2">
              {/* 이미지 */}
              <div className="flex justify-center pt-4">
                <img
                  src={`/assets/webp/flavorIcons/${fishBunFlavor.iconCode}.webp`}
                  alt={fishBunFlavor.flavor}
                  className="w-40 h-40 object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/webp/flavorIcons/notYet.webp"; // 이미지 로드 실패 시 기본 이미지로 대체
                  }}
                />
              </div>

              {/* 설명 */}
              <div className="px-5 pt-2 text-gray-700 text-justify text-sz22 whitespace-pre-line break-all">{fishBunFlavor.description}</div>
            </div>

            {/* 날짜별 데이터 */}
            <div className="mt-6">
              <div className="text-center text-sz30">발견 날짜</div>
              <ul className="mt-2 text-center text-sz20">
                {dateList.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg shadow-lg border-2 px-6 p-3 my-2 flex justify-between w-[80%] items-center mx-auto text-center transition transform active:scale-95 active:bg-blue-100"
                    onClick={() => navigate(`/detail/${item.id}`)}
                  >
                    <span className="text-sz25">
                      {item.date.split('-')[0]}년 {item.date.split('-')[1]}월 {item.date.split('-')[2]}일
                    </span>
                    <span className="text-sz25 text-yellow-600">{item.count}개</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">붕어빵 정보를 불러오는 중...</p>
        )
        }
      </div >
    </div >
  );
};

export default BookDetailPage;
