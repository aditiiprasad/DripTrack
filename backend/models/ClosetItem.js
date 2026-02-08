// backend/models/ClosetItem.js
const mongoose = require('mongoose');

const closetItemSchema = new mongoose.Schema({
  email: { type: String, required: true },
  clothName: { type: String, required: true },
  category: { type: String, required: true }, 
  wearCount: { type: Number, default: 0 },
  imageUrl: { type: String }, 
});

module.exports = mongoose.model("ClosetItem", closetItemSchema);
