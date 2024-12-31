import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AuthForm from "./AuthForm";
import axios from "axios";
import LoginHeader from "../basics/LoginHeader";
import Intro from "../Intro";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  const handleAuth = async (formData) => {
    try {
      const url = isLogin ? "https://driptrack.onrender.com/api/auth/login" : "https://driptrack.onrender.com/api/auth/signup";
      const response = await axios.post(url, formData);
  
      console.log("Success:", response.data);
  
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", formData.email);  
  
      navigate("/home");
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };
   

  return (
   

    <div className="w-full min-h-screen  bg-yellow-300">
      <div className="flex justify-end p-2">
        <a
        href="https://github.com/aditiiprasad/DripTrack"
        target="_blank"
        rel="noopener noreferrer"
        className="font-extrabold text-zinc-800 hover:text-custom-purple"
        >
        Source Code
        </a>
      </div>

      <div >
           <LoginHeader />
      </div>

      <div className="p-2 lg:px-56">

      
      <AuthForm mode={isLogin ? "login" : "signup"} onSubmit={handleAuth} />

      </div>


      <div className="flex justify-center ">
      <button
       onClick={() => setIsLogin(!isLogin)}
       className="mt-4 text-gray-800 font-shrikhand underline hover:text-custom-red"
      >
      {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
      </div> 

      <div className="flex justify-center p-2 pt-8">
      <Intro/>
      </div>



       </div>
    
   
  
  );
};

export default AuthPage;
