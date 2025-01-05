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
import Header from "./components/header/Header";
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
import TutorialPage from "./pages/tutorial/TutorialPage";
import WritingPage from './pages/writing/WritingPage'
import WritingPage2 from './pages/writing/WritingPage2'
import WritingPage3 from './pages/writing/WritingPage3'
import { Provider } from "react-redux"; // Provider 임포트
import store, { persistor } from "./redux/store"; // Store와 Persistor 가져오기
import { PersistGate } from "redux-persist/integration/react"; // PersistGate 추가
import ProtectedRoute from "./components/routes/ProtectedRoute";

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
      {" "}
      {/* Redux Store 제공 */}
      {/* Redux 상태 복원을 위한 PersistGate */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppContent isWebPSupported={isWebPSupported} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

function AppContent({ isWebPSupported }) {
  const location = useLocation();

  return (
    <div className="App flex flex-col h-[100dvh] justify-between">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/loadingPage" replace />} />
        <Route
          path="/loadingPage"
          element={<LoadingPage isWebPSupported={isWebPSupported} />}
        />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/tutorialPage" element={<TutorialPage />} />
        <Route path="/writingPage" element={<WritingPage />} />
        <Route path="/writingPage2" element={<WritingPage2 />} />
        <Route path="/writingPage3" element={<WritingPage3 />} />
        <Route
          path="/main"
          element={
            // <ProtectedRoute>
            <MainPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/bookPage"
          element={
            // <ProtectedRoute>
            <BookPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/calendarPage"
          element={
            // <ProtectedRoute>
            <CalendarPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/nicknamePage"
          element={
            // <ProtectedRoute>
            <NicknamePage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/register/addPage"
          element={
            // <ProtectedRoute>
            <AddPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/register/successPage/:id"
          element={
            // <ProtectedRoute>
            <SuccessPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/register/reportPage"
          element={
            // <ProtectedRoute>
            <ReportPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/detail/:id"
          element={
            // <ProtectedRoute>
            <DetailPage />
            // </ProtectedRoute>
          }
        />
        {/* 잘못된 경로일 때 */}
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
      {!["/loginPage", "/loadingPage"].includes(location.pathname) && (
        <Footer />
      )}
    </div>
  );
}

export default App;
