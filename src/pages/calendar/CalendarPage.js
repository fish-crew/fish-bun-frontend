import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

function CalendarPage() {
  const [value, setValue] = useState(new Date());

  const handleDateChange = (date) => {
    setValue(date);
    console.log('선택된 날짜:', date);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex-grow flex items-center justify-center">
        <Calendar
          onChange={handleDateChange}
          value={value}
          formatDay={(locale, date) => moment(date).format('D')}
        />
      </div>
    </div>
  );
}

export default CalendarPage;
