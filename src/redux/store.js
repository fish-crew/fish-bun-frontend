import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; // redux-persist를 위한 모듈 가져오기
import storage from 'redux-persist/lib/storage'; // Local Storage를 사용하기 위한 스토리지 가져오기
import userReducer from './slices/user'; // 사용자 닉네임 등을 관리하는 Slice 가져오기

// redux-persist 설정
const persistConfig = {
  key: 'user', // Local Storage에 저장될 key 이름
  storage, // Local Storage를 사용
};

// userReducer를 persistReducer로 감싸서 persist 기능 추가
const persistedReducer = persistReducer(persistConfig, userReducer);

// Redux Store 생성
const store = configureStore({
  reducer: {
    user: persistedReducer, // Persist된 userReducer 등록
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // redux-persist 관련 액션은 직렬화 검사를 무시하도록 설정
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', // 상태 저장 요청 액션
          'persist/REHYDRATE', // 상태 복원 요청 액션
          'persist/REGISTER', // 저장된 상태 등록 액션
          'persist/FLUSH', // 캐시 플러시 요청 액션
          'persist/PAUSE', // 상태 저장 일시 중지 요청 액션
          'persist/PURGE', // 저장된 상태 삭제 요청 액션
        ],
      },
    }),
});

// Persistor 생성: 상태 저장 및 복원을 관리
export const persistor = persistStore(store); // Persistor를 사용해 상태를 유지 및 복원

export default store; // Redux Store 내보내기
