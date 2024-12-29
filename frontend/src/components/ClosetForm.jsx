import React, { useState } from "react";
import axios from "axios";

const ClosetForm = () => {
  const [clothName, setClothName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [loading, setLoading] = useState(false); 

  const email = localStorage.getItem("email");

  const categories = [
    "Pants", "Shirts", "T-Shirts", "Skirts", "Dresses",
    "Shoes", "Accessories", "Indian Wear", "Winter Wear", "Shorts"
  ];

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const formData = new FormData();
    formData.append("email", email);
    formData.append("clothName", clothName);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("https://driptrack.onrender.com/api/closet/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Clothing item added to closet!");
      setClothName("");
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error(error);
      setMessage("Error adding item to closet.");
    } finally {
      setLoading(false); 
    }
  };

  const categoriesToShow = showMoreCategories ? categories : categories.slice(0, 6);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      {/* Cloth Name Input */}
      <div className="mb-4">
        <label className="block text-white font-semibold mb-2">Item Name</label>
        <input
          type="text"
          value={clothName}
          onChange={(e) => setClothName(e.target.value)}
          required
          className="w-full px-4 py-2 border font-shrikhand border-gray-300 rounded-full"
        />
      </div>

      {/* Category Buttons */}
      <div className="mb-4">
        <label className="block text-white font-semibold mb-2">Category</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categoriesToShow.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 border border-b-2 border-r-2 border-black font-bold rounded-full ${
                category === cat
                  ? "bg-custom-blue text-black border-black border-b-4 border-r-4 hover:bg-blue-400"
                  : "bg-white text-black border-black hover:border-b-4 hover:border-r-4"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {!showMoreCategories && (
          <button
            type="button"
            onClick={() => setShowMoreCategories(true)}
            className="mt-2 text-white font-extrabold hover:text-black"
          >
            Show More +
          </button>
        )}
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-white font-semibold">Upload Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full px-4 py-2 border border-white rounded-full"
        />
      </div>

      {/* Submit Button or Loader */}
      {loading ? (
        <div className="w-2/4 mx-auto text-center">
          <div className="loader border-t-4 border-white border-solid rounded-full h-8 w-8 animate-spin mx-auto"></div>
        </div>
      ) : (
        <button
          type="submit"
          className="w-2/4 px-4 py-2 bg-zinc-800 font-extrabold border-b-2 border-r-2 hover:border-b-4 hover:border-r-4 border text-white rounded-full focus:outline-none"
        >
          Upload
        </button>
      )}

      {/* Message */}
      {message && <p className="mt-4 text-white font-semibold">{message}</p>}
    </form>
  );
};

export default ClosetForm;
