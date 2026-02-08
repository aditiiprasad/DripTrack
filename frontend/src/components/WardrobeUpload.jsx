import React from "react";
import gif from "../assets/vid.gif";
import ClosetForm from "./ClosetForm";

const WardrobeUpload = () => {
  

  return (
    <div className="bg-white p-6 sm:p-2 mt-10 flex justify-center items-center">
      <div className="w-full max-w-4xl border mx-auto p-4 sm:p-6 rounded-lg bg-custom-red flex flex-col md:flex-row border-b-4 border-r-4 border-black">
        
        <div className="flex-1 md:w-1/2 p-4 mb-4 md:mb-0">
          <img
            src={gif}
            alt="Wardrobe"
            className="w-full object-cover rounded-lg"
          />
        </div>

        
        <div className="flex-1 md:w-1/2 p-4">
          <h4 className="font-shrikhand text-white text-2xl sm:text-3xl mb-4">
            Add to my Closet
          </h4>
          <ClosetForm /> 
        </div>
      </div>
    </div>
  );
};

export default WardrobeUpload;