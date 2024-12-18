// src/redux/slices/user.js
import { createSlice } from '@reduxjs/toolkit';

// Slice 생성
const userSlice = createSlice({
  name: 'user', // 상태 이름
  initialState: { nickname: '' }, // 초기 상태: 빈 닉네임
  reducers: {
    setNickname: (state, action) => {
      // 닉네임 설정
      state.nickname = action.payload;
    },
    clearNickname: (state) => {
      // 닉네임 초기화
      state.nickname = '';
    },
  },
});

// 액션과 리듀서 내보내기
export const { setNickname, clearNickname } = userSlice.actions; // 액션 내보내기
export default userSlice.reducer; // 리듀서 내보내기
