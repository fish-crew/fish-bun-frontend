import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import styles from "./CalendarPage.module.css"; // CSS 모듈 불러오기

import { fetchCalendarPageData } from "../../api/service.js";

function CalendarPage() {
  const [value, setValue] = useState(new Date());
  const [dateArray, setDateArray] = useState([]);
  const [monthlyCount, setMonthlyCount] = useState(0); //이번달 몇번
  const [eatenCount, setEatenCount] = useState(0); //이번달 몇마리
  const [specialDates, setSpecialDates] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const years = today.getFullYear();
        const month = today.getMonth() + 1;
        const response = await fetchCalendarPageData(`${years}-${month}`);
        const dates = response.data.map((item) => item.date);
        // 날짜를 YYYY-MM-DD 형태로 변환
        const formattedDates = dates.map((dateString) => {
          const date = new Date(dateString); // 문자열을 Date 객체로 변환
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1)
          const day = String(date.getDate()).padStart(2, "0"); // 일
          return `${year}-${month}-${day}`; // YYYY-MM-DD 형태로 반환
        });
        const eatenCnt = response.additionalData.monthlyCount;
        setSpecialDates(response.data);
        setDateArray(formattedDates);
        setMonthlyCount(formattedDates.length);
        setEatenCount(eatenCnt);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        alert("서버로부터 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setValue(formattedDate);
    const selectedDate = specialDates.find(
      (item) => item.date.split("T")[0] === formattedDate
    );
    console.log("선택된 날짜:", selectedDate);
    if (selectedDate) {
      navigate(`/detail/${selectedDate.id}`);
    }
  };

  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate("/main");
  };

  return (
    <div className="w-full flex-grow flex flex-col overflow-y-auto">
      <div className="w-full h-max">
        <img src="/assets/WebP/paperOnCheckT.webp" alt="상단 배너" />
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
        className="w-full flex flex-col flex-grow bg-cover px-3 pb-3"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}
      >
        <div className="w-full text-sz45 text-center pt-3 text-point-color">
          붕어 탐험 일지
        </div>
        <div className="flex flex-col flex-grow items-center justify-around">
          <img
            src="/assets/WebP/diaryLine.webp"
            alt="Special"
            className="w-full"
          />
          <Calendar
            //locale="en"
            onChange={handleDateChange}
            value={value}
            className={styles.reactCalendar} // CSS 모듈로 커스텀 클래스 적용
            formatDay={(locale, date) => moment(date).format("D")}
            showNeighboringMonth={false} // 인접 월의 날짜 표시 안 함
            next2Label={null} // ">>" 버튼 숨기기
            prev2Label={null} // "<<" 버튼 숨기기
            //prevLabel={null} // "<" 버튼 숨기기
            //nextLabel={null} // ">" 버튼 숨기기
            navigationLabel={({ date }) => (
              <span className="text-lg font-bold">
                {moment(date).format("MM")}월
              </span>
            )}
            tileContent={({ date, view }) => {
              if (view === "month") {
                // 날짜 형식을 "YYYY-MM-DD"로 변환
                const dateString = moment(date).format("YYYY-MM-DD");

                // 특정 날짜에만 이미지 추가
                if (dateArray.includes(dateString)) {
                  return (
                    <div className="flex justify-center">
                      <img
                        src="/assets/WebP/cal-bun.webp"
                        alt="Special"
                        className="w-[75%] aspect-[1/1]"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="flex justify-center">
                      <img
                        src="/assets/WebP/cal-bun-empty.webp"
                        alt="Special"
                        className="w-[75%] aspect-[1/1]"
                      />
                    </div>
                  );
                }
              }
              return null;
            }}
          />
          <div className="pb-3">
            {" "}
            <img
              src="/assets/WebP/diaryLine.webp"
              alt="Special"
              className="w-full"
            />
          </div>
        </div>
        <div className="text-sz22 items-center">
          이번달은{" "}
          <span className="text-orange-500 font-bold">{monthlyCount}</span>번,{" "}
          <span className="text-orange-500 font-bold">{eatenCount}</span>마리의
          붕어빵을 먹었어요!
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
