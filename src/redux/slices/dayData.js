import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dayData: {}, // 요일 데이터를 저장
};

const dayDataSlice = createSlice({
  name: "dayData",
  initialState,
  reducers: {
    addOrUpdateDayData: (state, action) => {
      const { day, id } = action.payload;
      state.dayData[day] = id; // 특정 요일에 ID 저장/업데이트
    },
    resetWeek: (state) => {
      state.dayData = {}; // 모든 요일 데이터 초기화
    },
  },
});

export const { addOrUpdateDayData, resetWeek } = dayDataSlice.actions;
export default dayDataSlice.reducer;
