import "./styles/App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "animate.css";
import Footer from "./components/footer/Footer";
import BookPage from "./pages/book/BookPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import LoginPage from "./pages/login/LoginPage";
import LoadingPage from "./pages/loading/loadingPage";
import MainPage from "./pages/main/MainPage";
import NicknamePage from "./pages/nickname/NicknamePage";
import AddPage from "./pages/register/add/AddPage";
import SuccessPage from "./pages/register/success/SuccessPage";
import ReportPage from "./pages/register/report/ReportPage";
import DetailPage from "./pages/detail/DetailPage";
import BungBalGamePage from "./pages/game/bungBalGamePage";
import BungBalResultPage from "./pages/game/result/resultPage";
import BookDetailPage from "./pages/bookDetail/BookDetailPage";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./components/MetaTags";
import DebateList from "./pages/debate/DebateList";
import DebatePost from "./pages/debate/DebatePost";
// map
import MapPage from "./pages/map/MapPage";
import RegisterPage from "./pages/map/RegisterPage";
import MapSelectionPage from "./pages/map/MapSelectionPage";
import StoreDetailPage from "./pages/map/StoreDetailPage";

// WebP 감지 로직
const detectWebP = () => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";
  });
};

function App() {
  const [isWebPSupported, setIsWebPSupported] = useState(false);

  useEffect(() => {
    detectWebP().then((supported) => {
      setIsWebPSupported(supported);
      const className = supported ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
    });
  }, []);

  return (
    <Provider store={store}>
      {/* Redux Store 제공 */}
      {/* Redux 상태 복원을 위한 PersistGate */}
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <BrowserRouter>
            <AppContent isWebPSupported={isWebPSupported} />
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

function AppContent({ isWebPSupported }) {
  const location = useLocation();
  // const isBungBalGamePage = location.pathname === "/bungBalGamePage";

  return (
    <div className="App flex flex-col h-[100dvh] justify-between">
      {/* {isBungBalGamePage && <MetaTags />} */}
      <MetaTags />
      <Routes>
        <Route path="/" element={<Navigate to="/loadingPage" replace />} />
        <Route
          path="/loadingPage"
          element={<LoadingPage isWebPSupported={isWebPSupported} />}
        />
        <Route path="/loginPage" element={<LoginPage />} />

        <Route path="" element={<ProtectedRoute />}>
          <Route path="main" element={<MainPage />} />
          <Route path="bookPage" element={<BookPage />} />
          <Route path="bookDetailPage/:flavorId" element={<BookDetailPage />} />
          <Route path="calendarPage" element={<CalendarPage />} />
          <Route path="nicknamePage" element={<NicknamePage />} />
          <Route path="register/addPage" element={<AddPage />} />
          <Route path="register/successPage/:id" element={<SuccessPage />} />
          <Route path="register/reportPage" element={<ReportPage />} />
          <Route path="detail/:id" element={<DetailPage />} />
          {/* DEBATE */}
          <Route path="/debateList" element={<DebateList />} />
          <Route path="/debatePost/:postid" element={<DebatePost />} />
        </Route>

        {/* GAME */}
        <Route path="/bungBalGamePage" element={<BungBalGamePage />} />
        <Route
          path="/bungBalGamePage/result/:flavorId"
          element={<BungBalResultPage />}
        />

        {/* MAP */}
        <Route path="map" element={<ProtectedRoute />}>
          <Route index element={<MapPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="register/map-selection" element={<MapSelectionPage />} />
          <Route path="store/:id" element={<StoreDetailPage />} />
        </Route>

        {/* 잘못된 경로일 때 */}
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>

      {/* 로그인과로딩 페이지에서는 푸터 숨김 */}
      {!["/loginPage", "/loadingPage"].includes(location.pathname) && (
        <Footer />
      )}
    </div>
  );
}

export default App;
