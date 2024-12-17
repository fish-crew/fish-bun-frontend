import "./styles/App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); // 현재 경로를 확인하기 위한 useLocation 사용

  return (
    <div className="App flex flex-col h-[100dvh] justify-between">
      {/* 공통 Header */}
      <Header />
      {/* 라우트 설정 */}
      <Routes>
        <Route path="/" element={<Navigate to="/loadingPage" replace />} />
        <Route path="/loadingPage" element={<LoadingPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/bookPage" element={<BookPage />} />
        <Route path="/calendarPage" element={<CalendarPage />} />
        <Route path="/nicknamePage" element={<NicknamePage />} />
        <Route path="/register/addPage" element={<AddPage />} />
        <Route path="/register/successPage/:id" element={<SuccessPage />} />
        <Route path="/register/reportPage" element={<ReportPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>

      {!["/loginPage", "/loadingPage"].includes(location.pathname) && (
        <Footer />
      )}
    </div>
  );
}

export default App;
