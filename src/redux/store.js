import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; // redux-persist를 위한 모듈 가져오기
import storage from 'redux-persist/lib/storage'; // Local Storage를 사용
import userReducer from './slices/user'; // 닉네임 관리 Slice 가져오기

// redux-persist 설정
const persistConfig = {
  key: 'user', // 저장될 key 이름
  storage, // Local Storage를 사용
};

// userReducer를 persistReducer로 래핑
const persistedReducer = persistReducer(persistConfig, userReducer);

// Redux Store 생성
const store = configureStore({
  reducer: {
    user: persistedReducer, // Persist된 Reducer 등록
  },
});

// Persistor 생성: 상태 저장 및 복원을 관리
export const persistor = persistStore(store);
export default store;
