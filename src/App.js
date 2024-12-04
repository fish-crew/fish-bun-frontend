import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BookPage from "./pages/Book/BookPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import LoginPage from "./pages/Login/LoginPage";
import MainPage from "./pages/Main/MainPage";
import NicknamePage from "./pages/Nickname/NicknamePage";
import AddPage from "./pages/Register/Add/AddPage";
import SuccessPage from "./pages/Register/Success/SuccessPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Main" element={<MainPage />} />
          <Route path="/BookPage" element={<BookPage />} />
          <Route path="/CalendarPage" element={<CalendarPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/NicknamePage" element={<NicknamePage />} />
          <Route path="/Register/AddPage" element={<AddPage />} />
          <Route path="/Register/SuccessPage" element={<SuccessPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
