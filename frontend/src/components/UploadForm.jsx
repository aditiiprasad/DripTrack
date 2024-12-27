// src/components/UploadForm.jsx

import React, { useState } from "react";

const UploadForm = ({ onSubmit }) => {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("image", image);

    onSubmit(formData); // Call onSubmit passed from parent component
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      {/* Category Buttons */}
      <div className="mb-4">
        <label className="block text-white font-semibold mb-2">Category</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => handleCategorySelect("shirt")}
            className={`px-4 py-2 border-b-2 border-r-2 border-black font-bold rounded-full ${category === "shirt" ? "bg-custom-blue text-black border-black border-b-4 border-r-4 hover:bg-blue-400" : "bg-white text-black border-black"}`}
          >
            Shirt
          </button>
          <button
            type="button"
            onClick={() => handleCategorySelect("tshirt")}
            className={`px-4 py-2 border-b-2 border-r-2 border-black font-bold rounded-full ${category === "tshirt" ? "bg-custom-blue text-black border-black border-b-4 border-r-4 hover:bg-blue-400" : "bg-white text-black border-black"}`}
          >
            T-shirt
          </button>
          <button
            type="button"
            onClick={() => handleCategorySelect("pant")}
            className={`px-4 py-2 border-b-2 border-r-2 border-black font-bold rounded-full ${category === "pant" ? "bg-custom-blue text-black border-black border-b-4 border-r-4 hover:bg-blue-400" : "bg-white text-black border-black"}`}
          >
            Pant
          </button>
          <button
            type="button"
            onClick={() => handleCategorySelect("skirt")}
            className={`px-4 py-2 border-b-2 border-r-2 border-black font-bold rounded-full ${category === "skirt" ? "bg-custom-blue text-black border-black border-b-4 border-r-4 hover:bg-blue-400" : "bg-white text-black border-black"}`}
          >
            Skirt
          </button>
          <button
            type="button"
            onClick={() => handleCategorySelect("dress")}
            className={`px-4 py-2 border-b-2 border-r-2 border-black font-bold rounded-full ${category === "dress" ? "bg-custom-blue text-black border-black border-b-4 border-r-4 hover:bg-blue-400" : "bg-white text-black border-black"}`}
          >
            Dress
          </button>
          <button
            type="button"
            onClick={() => handleCategorySelect("accessory")}
            className={`px-4 py-2 border-b-2 border-r-2 border-black font-bold rounded-full ${category === "accessory" ? "bg-custom-blue text-black border-black border-b-4 border-r-4 hover:bg-blue-400" : "bg-white text-black border-black"}`}
          >
            Accessory
          </button>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block  text-white font-semibold">Upload Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-full"
        />
        
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-2/4  px-4 py-2 bg-zinc-800 font-extrabold border-b-4 border-r-4  text-white rounded-full hover:bg-zinc-700  focus:outline-none"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
