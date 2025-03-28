import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local Storage를 사용하기 위한 스토리지 가져오기
import userReducer from "./slices/user"; // 사용자 닉네임 등을 관리하는 Slice 가져오기
import mapReducer from "./slices/map";
// redux-persist 설정
const userPersistConfig = {
  key: "user", // Local Storage에 저장될 key 이름
  storage, // Local Storage를 사용
};

// Reducer에 persistReducer로 감싸서 persist 기능 추가
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Redux Store 생성
const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Persist된 userReducer 등록
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
});

// Persistor 생성: 상태 저장 및 복원을 관리
export const persistor = persistStore(store); // Persistor를 사용해 상태를 유지 및 복원

export default store; // Redux Store 내보내기
