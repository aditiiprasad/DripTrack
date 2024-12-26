import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const WardrobeUploadForm = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate(); 

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !category) {
      alert("Please upload an image and select a category");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);

    try {
      const response = await axios.post("http://localhost:5000/api/wardrobe/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        
        },
      });
      alert("Item uploaded successfully!");
    } catch (error) {
      console.error("Error uploading item", error);
      alert("Failed to upload item");
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/");
  };
  
  return (
    <div>
      <h2>Upload a New Wardrobe Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image: </label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <label>Category: </label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="shirt">Shirt</option>
            <option value="pants">Pants</option>
            <option value="winter-wear">Winter Wear</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <button type="submit">Upload</button>
      </form>

      {/* Logout Button */}
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default WardrobeUploadForm;
