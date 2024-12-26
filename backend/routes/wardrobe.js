// backend/routes/wardrobe.js

const express = require("express");
const cloudinary = require("../utils/cloudinary");
const WardrobeItem = require("../models/WardrobeItem");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const verifyToken = require("../middleware/verifyToken"); 


router.post("/upload", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { category } = req.body;
    const imageFile = req.file;

    
    if (!imageFile) {
      return res.status(400).json({ message: "No image file received" });
    }

    
    const result = await cloudinary.uploader.upload(imageFile.buffer, {
      folder: "driptrack_wardrobe",
    });

    
    const newWardrobeItem = new WardrobeItem({
      user_id: req.user.id, 
      image_url: result.secure_url,
      category,
    });

    await newWardrobeItem.save();

    res.status(201).json({ message: "Item uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading wardrobe item:", error);
    res.status(500).json({ message: "Error uploading item" });
  }
});

module.exports = router;
