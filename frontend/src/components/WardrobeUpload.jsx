// src/components/WardrobeUpload.jsx

import React from "react";
import axios from "axios";

import gif from "../assets/vid.gif"; 
import ClosetForm from "./ClosetForm";

const WardrobeUpload = () => {
  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://driptrack.onrender.com/api/wardrobe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading wardrobe item", error);
      console.log(error.response);
      alert("Failed to upload item.");
    }
  };

  return (
    <div className="   bg-white p-14 mt-36 flex justify-center align-middle  ">
      <div className="w-full  border mx-auto  p-2 rounded-lg  mt-8 bg-custom-red flex flex-col md:flex-row border-b-4 border-r-4 border-black">
        
        <div className="flex-1 md:w-1/2 p-4 border-r-2 border-white">
          <img
            src={gif} 
            alt="Wardrobe"
            className="w-full  object-cover rounded-lg"
          />
        </div>

        
        <div className="flex-1 md:w-1/2 p-4">
          <h4 className="font-shrikhand text-white text-3xl">Add to my Closet</h4>
          
          <ClosetForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default WardrobeUpload;
