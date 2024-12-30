import React from "react";
import wardrobeImage from "./basics/assets/bulb.gif"; 
import Intro from "./Intro";

const Topbar = () => {
  const email = localStorage.getItem("email"); 

  return (
    <div className="p-6 sm:p-4 mt-24 sm:mt-36 flex flex-col items-center  ml-10 mr-10 ">
     
      <div className="border border-black p-3 font-extrabold bg-white rounded-full border-r-4 border-b-4 text-sm sm:text-base text-center mb-6">
        Logged in with - <span className="text-custom-red">{email}</span>
      </div>

    <Intro/>
    </div>
  );
};

export default Topbar;
