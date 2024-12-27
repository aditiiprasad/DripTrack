// src/components/WardrobeList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const WardrobeList = () => {
  const [wardrobe, setWardrobe] = useState([]);

  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/wardrobe", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWardrobe(response.data);
      } catch (error) {
        console.error("Error fetching wardrobe", error);
      }
    };

    fetchWardrobe();
  }, []);

  return (
    <div>
      <h2>Your Wardrobe</h2>
      <ul>
        {wardrobe.map((item) => (
          <li key={item._id}>
            <p>Category: {item.category}</p>
            <img src={item.imageUrl} alt={item.category} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WardrobeList;
