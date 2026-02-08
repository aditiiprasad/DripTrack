const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  email: { type: String, required: true },
  itemName: { type: String, required: true },
  price: { type: Number }, // Optional: to track budget
  imageUrl: { type: String }, // Optional: if they upload a pic of what they want
  notes: { type: String }, // e.g. "Buy this for the summer wedding"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WishlistItem", wishlistItemSchema);