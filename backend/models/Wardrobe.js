// backend/models/Wardrobe.js
const mongoose = require("mongoose");

const wardrobeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Wardrobe", wardrobeSchema);
