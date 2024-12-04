import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BookPage from "./pages/book/BookPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import NicknamePage from "./pages/nickname/NicknamePage";
import AddPage from "./pages/register/Add/AddPage";
import SuccessPage from "./pages/register/Success/SuccessPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/bookPage" element={<BookPage />} />
          <Route path="/calendarPage" element={<CalendarPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/nicknamePage" element={<NicknamePage />} />
          <Route path="/register/addPage" element={<AddPage />} />
          <Route path="/register/successPage" element={<SuccessPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
