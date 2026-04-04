import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const Signup = () => {
  const navigate = useNavigate();

  return (
   <AuthLayout
  isLogin={false}
  onSwitch={() => navigate("/login")}  
/>
  );
};

export default Signup;