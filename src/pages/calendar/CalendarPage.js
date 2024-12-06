import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import styles from './CalendarPage.module.css'; // CSS 모듈 불러오기

function CalendarPage() {
  const [value, setValue] = useState(new Date());

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD")
    setValue(formattedDate);
    console.log('선택된 날짜:', formattedDate);
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      <div class="text-2xl items-center m-6">붕어 탐험일지</div>
      <div className="flex-grow flex items-center justify-center mx-6">
        <Calendar
          //locale="en"
          onChange={handleDateChange}
          value={value}
          className={styles.reactCalendar} // CSS 모듈로 커스텀 클래스 적용
          formatDay={(locale, date) => moment(date).format('D')}
          formatMonthYear={(locale, date) => `${moment(date).format('MM')}월`}
          showNeighboringMonth={false} // 인접 월의 날짜 표시 안 함
          next2Label={null} // ">>" 버튼 숨기기
          prev2Label={null} // "<<" 버튼 숨기기
        />
      </div>
      <div class="text-xl items-center m-6">이번달은 n마리의 붕어빵을 먹었어요!</div>
    </div>
  );
}

export default CalendarPage;
