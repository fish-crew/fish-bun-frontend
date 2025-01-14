import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dayData, setDayData] = useState({}); // 요일 데이터를 저장하는 상태

  // 특정 요일 데이터 추가/업데이트
  const addOrUpdateDayData = (day, id) => {
    setDayData((prev) => ({
      ...prev,
      [day]: id, // 요일을 키로, ID를 값으로 저장
    }));
  };

  // 일주일 데이터 초기화
  const resetWeek = () => {
    setDayData({}); // 데이터를 초기화
  };

  return (
    <DataContext.Provider value={{ dayData, addOrUpdateDayData, resetWeek }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
