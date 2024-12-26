// backend/models/WardrobeItem.js

const mongoose = require("mongoose");

const wardrobeItemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const WardrobeItem = mongoose.model("WardrobeItem", wardrobeItemSchema);

module.exports = WardrobeItem;
