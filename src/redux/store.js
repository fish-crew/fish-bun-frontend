import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user'; // 닉네임 관리 Slice 가져오기

// Redux Store 생성
const store = configureStore({
  reducer: {
    user: userReducer, // 닉네임 상태를 Redux Store에 등록
  },
});

export default store; // Store를 내보내기
