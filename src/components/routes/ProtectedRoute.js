import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../api/cookie";

const ProtectedRoute = ({ children }) => {
  const [alertShown, setAlertShown] = useState(false);
  const accessToken = getCookie();

  if (!accessToken) {
    if (!alertShown) {
      // console.warn("로그인이 필요합니다.");
      alert("로그인이 필요합니다.");
      setAlertShown(true);
    }
    return <Navigate to="/loginPage" replace />;
  }

  return children;
};

export default ProtectedRoute;
