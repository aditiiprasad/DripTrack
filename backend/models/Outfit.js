const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  email: { type: String, required: true },
  outfitName: { type: String, required: true },
  // We store an array of IDs referencing the ClosetItem model
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClosetItem' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Outfit", outfitSchema);