// src/components/WardrobeUpload.jsx

import React from "react";
import axios from "axios";
import UploadForm from "./UploadForm"; 
import gif from "../assets/vid.gif"; 

const WardrobeUpload = () => {
  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/wardrobe",
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
    <div className="min-w-max   bg-white p-20 mt-36 flex justify-center align-middle">
      <div className="w-full   mx-auto  p-6 rounded-lg shadow-lg mt-8 bg-custom-red flex flex-col md:flex-row">
        
        <div className="flex-1 md:w-1/2 p-4 border-r-2 border-white">
          <img
            src={gif} 
            alt="Wardrobe"
            className="w-full  object-cover rounded-lg"
          />
        </div>

        
        <div className="flex-1 md:w-1/2 p-4">
          <h4 className="font-shrikhand text-white text-3xl">Add to your Closet</h4>
          <UploadForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default WardrobeUpload;
