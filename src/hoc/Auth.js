import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginPage from '../pages/LoginPage';

function Auth({ children }) {
  const user = useSelector((state) => state.auth.login?.currentUser);

  return <>{user ? children : <LoginPage />}</>;
}

export default Auth;
