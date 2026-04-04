import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const navigate = useNavigate();

  return (
  <AuthLayout
  isLogin={true}
  onSwitch={() => navigate("/signup")}   
/>
  );
};

export default Login;