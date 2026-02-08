
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaCheckCircle, FaShoppingBag } from "react-icons/fa";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

 
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/wishlist/list/${email}`, config);
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error fetching wishlist", error);
    }
  };

  useEffect(() => {
    if (token) fetchWishlist();
  }, [token]);

  
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("price", price);
    formData.append("notes", notes);
    formData.append("email", email);
    if (image) formData.append("image", image);

    try {
      await axios.post(`${API_URL}/api/wishlist/add`, formData, {
        headers: { ...config.headers, "Content-Type": "multipart/form-data" },
      });
      setMessage("Added to Wishlist! 🎯");
      setItemName("");
      setPrice("");
      setNotes("");
      setImage(null);
      fetchWishlist(); 
    } catch (error) {
      setMessage("Error adding item.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/wishlist/delete/${id}`, config);
      setWishlistItems(wishlistItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  
  const handleMoveToCloset = async (id) => {
    try {
      await axios.post(`${API_URL}/api/wishlist/move-to-closet/${id}`, {}, config);
      setWishlistItems(wishlistItems.filter((item) => item._id !== id));
      alert("Woohoo! Item moved to your Closet! 🎉");
    } catch (error) {
      alert("Error moving item.");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center p-8  border-black">
      
      
      <div className="bg-white px-8 py-4 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-10 transform -rotate-1">
        <h1 className="text-4xl font-shrikhand text-black flex items-center gap-3">
           Wishlist <FaShoppingBag className="text-custom-pink"/>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
        
        
        <div className="flex-1 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
          <h2 className="text-2xl font-shrikhand mb-4 text-center">Add Desire ✨</h2>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <input 
              type="text" placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)} required
              className="p-3 border-2 border-black rounded-xl font-bold"
            />
            <input 
              type="number" placeholder="Price (Optional)" value={price} onChange={e => setPrice(e.target.value)}
              className="p-3 border-2 border-black rounded-xl font-bold"
            />
            <textarea 
              placeholder="Notes (e.g., for Summer trip)" value={notes} onChange={e => setNotes(e.target.value)}
              className="p-3 border-2 border-black rounded-xl font-bold"
            />
            <input 
              type="file" onChange={e => setImage(e.target.files[0])} accept="image/*"
              className="p-2 border-2 border-black rounded-xl font-bold"
            />
            <button type="submit" disabled={loading} className="bg-custom-purple text-white p-3 rounded-xl border-2 border-black font-shrikhand hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              {loading ? "Adding..." : "Add to Wishlist"}
            </button>
            {message && <p className="text-center font-bold">{message}</p>}
          </form>
        </div>

        
        <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
          {wishlistItems.length === 0 ? (
            <div className="col-span-full text-center font-shrikhand text-2xl opacity-50">
              Nothing you want yet? Impossible! 😉
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-3xl border-4 border-black relative hover:scale-[1.02] transition-transform">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.itemName} className="w-full h-40 object-cover rounded-xl border-2 border-black mb-3" />
                )}
                <h3 className="text-xl font-shrikhand">{item.itemName}</h3>
                {item.price && <p className="font-bold text-green-600">₹{item.price}</p>}
                {item.notes && <p className="text-sm text-gray-600 italic mb-4">"{item.notes}"</p>}
                
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => handleMoveToCloset(item._id)}
                    className="flex-1 bg-green-400 text-black border-2 border-black rounded-lg p-2 font-bold flex items-center justify-center gap-2 hover:bg-green-500"
                    title="Mark as Purchased"
                  >
                    <FaCheckCircle /> Got it!
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="bg-custom-red text-white border-2 border-black rounded-lg p-2 hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;