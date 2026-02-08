// src/components/ClosetList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const ClosetList = () => {
  const [closetItems, setClosetItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("DecreasingWear");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token"); // <--- GET TOKEN

  // Config for Axios to include the token
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const categories = [
    "All", "Pants", "Shirts", "T-Shirts", "Skirts", "Dresses",
    "Shoes", "Accessories", "Indian Wear", "Winter Wear", "Shorts",
  ];

  const fetchClosetItems = async () => {
    setLoading(true);
    setError("");
    try {
      // Added config here
      const response = await axios.get(
        `${API_URL}/api/closet/list/${email}`,
        config 
      );
      setClosetItems(response.data);
      setFilteredItems(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching closet items.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email && token) {
      fetchClosetItems();
    } else {
      setError("Please log in to view your closet.");
      setLoading(false);
    }
  }, [email]);

  // ... (Keep the sorting useEffect logic exactly the same) ...
  useEffect(() => {
    let sortedItems = [...closetItems];
    if (selectedCategory !== "All") {
      sortedItems = sortedItems.filter((item) => item.category === selectedCategory);
    }
    switch (sortOption) {
      case "Alphabetical": sortedItems.sort((a, b) => a.clothName.localeCompare(b.clothName)); break;
      case "IncreasingWear": sortedItems.sort((a, b) => a.wearCount - b.wearCount); break;
      case "DecreasingWear": sortedItems.sort((a, b) => b.wearCount - a.wearCount); break;
      default: break;
    }
    setFilteredItems(sortedItems);
  }, [selectedCategory, closetItems, sortOption]);


  const handleIncrement = async (itemId) => {
    try {
      const updatedItems = closetItems.map((item) =>
        item._id === itemId ? { ...item, wearCount: item.wearCount + 1 } : item
      );
      setClosetItems(updatedItems);

      // Added config here
      await axios.put(
        `${API_URL}/api/closet/update/${itemId}`,
        { wearCount: updatedItems.find((item) => item._id === itemId).wearCount },
        config 
      );
    } catch (error) {
      setError("Error updating wear count.");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      // Added config here
      await axios.delete(`${API_URL}/api/closet/delete/${itemId}`, config);

      setClosetItems(closetItems.filter((item) => item._id !== itemId));
      setFilteredItems(filteredItems.filter((item) => item._id !== itemId));
    } catch (error) {
      setError("Error deleting item.");
    }
  };

  if (loading) return <div className="circular-loader"></div>;
  if (error) return <p className="font-extrabold text-red-500">{error}</p>;

  // ... (Return JSX remains exactly the same) ...
  return (
    <div>
        {/* Paste the rest of your original JSX here */}
        <div className="mb-4 flex justify-end">
        <button
          onClick={fetchClosetItems}
          className="px-4 py-2 border border-black bg-custom-purple text-white font-extrabold border-b-2 border-r-2 rounded-full hover:border-b-4 hover:border-r-4 focus:outline-none flex items-center space-x-2"
        >
          <FiRefreshCcw className="text-lg" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 md:pb-0">
        {categories.map((category) => (
          <button
            key={category}
            className={`border px-4 py-2 rounded-full text-sm font-extrabold ${
              selectedCategory === category
                ? "bg-custom-blue border-b-4 border-r-4 border-black text-black font-extrabold"
                : "bg-white border-b-2 border-r-2 border-black text-gray-800 hover:border-b-4 hover:border-r-4"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <label className="mr-4 font-extrabold">Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 bg-zinc-800 border text-yellow-500 font-extrabold border-b-4 border-r-4 border-yellow-500 rounded-full ring-0"
        >
          <option value="None" className="font-extrabold">None</option>
          <option value="Alphabetical" className="font-extrabold">Alphabetical</option>
          <option value="IncreasingWear" className="font-extrabold">Least Worn</option>
          <option value="DecreasingWear" className="font-extrabold">Most Worn</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-r-4 border-b-4 border-black p-4 flex flex-col items-center sm:w-64 md:w-72 lg:w-80 xl:w-80"
            >
              <div className="flex justify-between w-full mb-2 items-center">
                <h3 className="text-base rounded-full border bg-yellow-400 p-2 border-black border-r-2 border-b-2 font-extrabold text-gray-800">
                  {item.clothName}
                </h3>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="ml-4 p-2 bg-custom-red border-black border-b-2 border-r-2 hover:border-b-4 hover:border-r-4 text-white font-bold rounded-full focus:outline-none"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>

              <div className="flex justify-center w-full mb-2 items-center">
                <span className="font-extrabold text-zinc-800 mr-2">
                  Worn: {item.wearCount} times
                </span>
                <button
                  onClick={() => handleIncrement(item._id)}
                  className="px-2 bg-zinc-800 text-white font-extrabold border-b-4 border-r-4 text-3xl rounded-full focus:outline-none flex items-center space-x-2 hover:border-r-2 hover:border-b-2 border-zinc-600"
                >
                  +
                </button>
              </div>

              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.clothName}
                  className="w-full h-full object-cover border border-r-4 border-b-4 border-black rounded-xl"
                  style={{ aspectRatio: "1" }}
                />
              )}
            </div>
          ))
        ) : (
          <img
            src="/noitem.png"
            alt="No items"
            className="w-56 h-56 object-cover mb-4"
          />
        )}
      </div>
    </div>
  );
};

export default ClosetList;