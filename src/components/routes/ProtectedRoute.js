import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../api/cookie";
import { showAlert } from "../../components/modals/AlertModal.js";

const ProtectedRoute = () => {
  const [alertShown, setAlertShown] = useState(false);
  const accessToken = getCookie();

  if (!accessToken) {
    if (!alertShown) {
      // console.warn("로그인이 필요합니다.");
      {
        showAlert("로그인이 필요합니다.");
      }
      setAlertShown(true);
    }
    return <Navigate to="/loginPage" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
