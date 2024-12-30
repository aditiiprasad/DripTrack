import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import AuthForm from "./AuthForm";
import axios from "axios";
import LoginHeader from "../basics/LoginHeader";
import Intro from "../Intro";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

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
    <div className="min-w-max  flex flex-col items-center justify-center bg-yellow-300">
      <LoginHeader />
      <div>
      <a
        href="https://github.com/aditiiprasad/DripTrack"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 text-zinc-800 hover:text-custom-purple font-bold text-lg"
      >
        Source Code
      </a>
      </div>
      <AuthForm mode={isLogin ? "login" : "signup"} onSubmit={handleAuth} />
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-gray-800 font-shrikhand underline"
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
      <div className="flex justify-center p-2 pt-8">
        <Intro/>
      </div>
    </div>
  );
};

export default AuthPage;
