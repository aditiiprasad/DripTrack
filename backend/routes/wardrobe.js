// backend/routes/wardrobe.js
const express = require("express");
const Wardrobe = require("../models/Wardrobe");
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Upload a new wardrobe item
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  const { category } = req.body;
  const { path: imageUrl } = req.file;

  try {
    const wardrobeItem = new Wardrobe({
      userId: req.user.id,
      category,
      imageUrl,
    });
    await wardrobeItem.save();
    res.status(201).json(wardrobeItem);
  } catch (error) {
    res.status(500).json({ message: "Error uploading wardrobe item", error });
  }
});

// Get all wardrobe items for a user
router.get("/", verifyToken, async (req, res) => {
  try {
    const wardrobe = await Wardrobe.find({ userId: req.user.id });
    res.status(200).json(wardrobe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wardrobe items", error });
  }
});

module.exports = router;
