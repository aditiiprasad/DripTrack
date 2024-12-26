import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AuthForm from "./AuthForm";
import axios from "axios";
import LoginHeader from "../basics/LoginHeader";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  const handleAuth = async (formData) => {
    try {
      const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/signup";
      const response = await axios.post(url, formData);
  
      console.log("Success:", response.data);
      alert(`Authentication successful! Token: ${response.data.token}`);
      
      
      localStorage.setItem("token", response.data.token);
      
     
      navigate("/form");
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-300">
   

<LoginHeader/>
      <AuthForm mode={isLogin ? "login" : "signup"} onSubmit={handleAuth} />
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-gray-800 font-shrikhand underline"
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthPage;
