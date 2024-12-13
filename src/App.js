import "./styles/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BookPage from "./pages/book/BookPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import LoginPage from "./pages/login/LoginPage";
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
  const location = useLocation(); // useLocation은 BrowserRouter 내부에서만 동작

  return (
    <div className="App flex flex-col h-[100dvh] justify-between">
      <Header />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/bookPage" element={<BookPage />} />
        <Route path="/calendarPage" element={<CalendarPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/nicknamePage" element={<NicknamePage />} />
        <Route path="/register/addPage" element={<AddPage />} />
        <Route path="/register/successPage" element={<SuccessPage />} />
        <Route path="/register/reportPage" element={<ReportPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
      {location.pathname !== "/loginPage" && <Footer />}
    </div>
  );
}

export default App;
