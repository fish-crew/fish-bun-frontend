import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import styles from './CalendarPage.module.css'; // CSS 모듈 불러오기
import calBunImage from '../../assets/cal-bun.png';
import diaryLine from '../../assets/diaryLine.png'

function CalendarPage() {
  const [value, setValue] = useState(new Date());
  const [dateArray, setDateArray] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 초기화

  // 서버에서 가져올 데이터 지금은 예시
  const specialDates = [{ "date": "2024-12-30", "id": "1" },
  { "date": "2024-12-07", "id": "2" },
  { "date": "2024-12-01", "id": "3" },
  { "date": "2024-12-15", "id": "4" }];

  useEffect(() => {
    const dates = specialDates.map(item => item.date);
    setDateArray(dates);
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정


  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD")
    setValue(formattedDate);
    const selectedDate = specialDates.find(item => item.date === formattedDate);
    console.log('선택된 날짜:', selectedDate);
    if (selectedDate) {
      navigate(`/detail/${selectedDate.id}`);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      <div>
        <div className="text-title items-center m-3">붕어 탐험일지</div>
        <div className="grow-0 items-start justify-center mx-6">
          <img src={diaryLine} alt="Special" className="w-full" />
          <Calendar
            //locale="en"
            onChange={handleDateChange}
            value={value}
            className={styles.reactCalendar} // CSS 모듈로 커스텀 클래스 적용
            formatDay={(locale, date) => moment(date).format('D')}
            showNeighboringMonth={false} // 인접 월의 날짜 표시 안 함
            next2Label={null} // ">>" 버튼 숨기기
            prev2Label={null} // "<<" 버튼 숨기기
            //prevLabel={null} // "<" 버튼 숨기기
            //nextLabel={null} // ">" 버튼 숨기기
            navigationLabel={({ date }) => (
              <span className="text-lg font-bold">{moment(date).format('MM')}월</span>
            )}
            tileContent={({ date, view }) => {
              if (view === "month") {
                // 날짜 형식을 "YYYY-MM-DD"로 변환
                const dateString = moment(date).format("YYYY-MM-DD");

                // 특정 날짜에만 이미지 추가
                if (dateArray.includes(dateString)) {
                  return (
                    <div className="flex justify-center">
                      <img src={calBunImage} alt="Special" className="w-6 h-6" />
                    </div>
                  );
                }
              }
              return null;
            }}
          />
          <img src={diaryLine} alt="Special" className="w-full" />
        </div>
        <div className="text-sz25 items-center m-6">
          이번달은 <span className="text-orange-500 font-bold">{dateArray.length}</span>마리의 붕어빵을 먹었어요!
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
