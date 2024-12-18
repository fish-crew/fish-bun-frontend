import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { fetchFlavorData, fetchDetailPageData } from "../../api/service.js";

function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // 경로에서 id 가져오기
  const [content, setContent] = useState(""); // 최종 문자열 저장

  const textRef = useRef(null); // 텍스트 컨테이너 참조
  const [lineCount, setLineCount] = useState(0); // 텍스트 줄 수 저장

  const [detailData, setDetailData] = useState({}); // 데이터 저장
  const [flavorsData, setFlavorsData] = useState([]); // 데이터 저장
  const [eatenFlavors, setEatenFlavors] = useState([]);
  const [date, setDate] = useState(null); // Date 객체를 저장할 state
  const [processedData, setProcessedData] = useState([]);
  // 데이터 요청
  useEffect(() => {
    const getDetailData = async () => {
      try {
        const detailResponse = await fetchDetailPageData(id); // 상세 APi
        setDetailData(detailResponse.data); // 서버에서 받은 데이터의 "data"만 저장

        const jsonString = detailResponse.data.flavors;
        // 문자열을 객체 배열로 변환
        const jsonObjectArray = JSON.parse(jsonString);
        setEatenFlavors(jsonObjectArray);

        const dateString = detailResponse.data.date; // 서버에서 받은 날짜 문자열
        const dateObject = new Date(dateString); // 문자열을 Date 객체로 변환
        setDate(dateObject); // 상태에 저장

        const flavorsResponse = await fetchFlavorData(); // 전체 맛 api
        // "미확인 붕어빵" 분리
        const unknownFlavor = flavorsResponse.data.find(
          (item) => item.flavor === "미확인 붕어빵"
        );
        const filteredFlavors = flavorsResponse.data.filter(
          (item) => item.flavor !== "미확인 붕어빵"
        );

        // seq 기준 정렬
        const sortedFlavors = filteredFlavors.sort((a, b) => a.seq - b.seq);

        // 마지막에 "미확인 붕어빵" 추가
        const finalFlavors = unknownFlavor
          ? [...sortedFlavors, unknownFlavor]
          : sortedFlavors;
        setFlavorsData(finalFlavors); // 응답 데이터 저장
      } catch (error) {
        console.error("데이터 요청 실패:", error);
      }
    };

    getDetailData();
  }, []); // id가 변경될 때마다 다시 실행

  // 두 번째 useEffect: flavorsData 업데이트 후 실행
  useEffect(() => {
    if (flavorsData.length > 0 && eatenFlavors.length > 0) {
      // flavorsData와 eatenFlavors를 이용한 후속 작업 실행
      const mergedData = eatenFlavors.map((eaten) => {
        const matchedFlavor = flavorsData.find(
          (flavor) => flavor.id === eaten.flavorId
        );
        return {
          ...matchedFlavor,
          count: eaten.count,
        };
      });
      setProcessedData(mergedData);
    }
  }, [flavorsData, eatenFlavors]); // flavorsData와 eatenFlavors 변경 시 실행

  useEffect(() => {
    if (processedData.length > 0) {
      // flavor와 count를 결합한 문자열 배열 생성
      const flavorsWithCount = processedData.map(
        (item) => `${item.flavor} ${item.count}개`
      );

      // 배열을 콤마(,)로 연결한 문장 생성
      const flavorSentence = flavorsWithCount.join(", ");

      // 최종 문장 생성
      const finalSentence = `오늘은 ${flavorSentence}를 먹었다. 그래서 총 ${processedData.length}종류를 먹었다. 정말 맛있었다!`;

      setContent(finalSentence); // 상태에 저장
    }
  }, [processedData]);

  // 텍스트 줄 수 계산
  useEffect(() => {
    const calculateLineCount = () => {
      if (textRef.current) {
        const containerHeight = textRef.current.offsetHeight; // 텍스트 컨테이너 높이
        const lineHeight = parseFloat(
          getComputedStyle(textRef.current).lineHeight
        ); // 한 줄의 높이
        setLineCount(Math.ceil(containerHeight / lineHeight)); // 줄 수 계산
      }
    };

    calculateLineCount();
    window.addEventListener("resize", calculateLineCount); // 화면 크기 변화 감지

    return () => window.removeEventListener("resize", calculateLineCount); // 이벤트 제거
  }, [content]);

  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate("/calendarPage");
  };

  return (
    <div className="flex flex-col justify-start h-full overflow-y-auto relative">
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
        className="w-full flex flex-col flex-grow bg-cover bg-repeat-y"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}
      >
        <div className="flex justify-between mx-4 mt-4 pb-2 text-sz30">
          <div>
            {date ? (
              <>
                <span>{date.getMonth() + 1}</span>월{" "}
                <span>{date.getDate()}</span>일{" "}
                <span>
                  {
                    [
                      "일요일",
                      "월요일",
                      "화요일",
                      "수요일",
                      "목요일",
                      "금요일",
                      "토요일",
                    ][date.getDay()]
                  }
                </span>
              </>
            ) : (
              <span>날짜를 불러오는 중...</span>
            )}
          </div>
          <div>날씨:어쨌든맑음</div>
        </div>
        <div className="flex flex-col px-3 pb-3 flex-grow justify-start w-full">
          <div className="relative flex justify-center items-center w-full h-[calc(100vw_*_336/600)]">
            {/* 가운데 배치할 이미지 */}
            <div className="absolute top-0 h-full flex justify-center items-center overflow-hidden">
              <img
                src={detailData.fileUrl}
                alt="bunImage"
                className="max-w-[95%] max-h-[95%] object-contain"
              />
            </div>
            {/* 테두리 이미지 */}
            <img
              src="/assets/webp/diaryphotoBox.webp"
              alt="diaryPhotoBox"
              className="absolute top-0 w-full h-full object-contain pointer-events-none"
            />
          </div>

          {/* 텍스트와 선 */}
          <div className="relative w-full text-sz35 text-start leading-[3rem] px-2">
            {/* 텍스트 */}
            <p ref={textRef} className="relative z-10 break-all">
              {content}
            </p>

            {/* 선 이미지 */}
            <div className="absolute top-11 left-0 w-full pointer-events-none z-0">
              {Array.from({ length: lineCount }).map((_, index) => (
                <img
                  key={index}
                  src="/assets/webp/diaryLine.webp"
                  alt="diaryLine"
                  className="w-full h-[0.3rem]"
                  style={{ position: "absolute", top: `${index * 3}rem` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
