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
    <div className="flex flex-col w-full h-screen">
      <div className="flex-grow flex items-center justify-center">
        <Calendar
          //locale="en"
          onChange={handleDateChange}
          value={value}
          className={styles.reactCalendar} // CSS 모듈로 커스텀 클래스 적용
          formatDay={(locale, date) => moment(date).format('D')}
          formatMonthYear={(locale, date) => `${moment(date).format('MM')}월`}
        />
      </div>
    </div>
  );
}

export default CalendarPage;
