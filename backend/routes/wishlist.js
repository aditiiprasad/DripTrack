const express = require("express");
const WishlistItem = require("../models/WishlistItem");
const ClosetItem = require("../models/ClosetItem"); // Needed for "Move to Closet" feature
const upload = require("../config/cloudinary");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// 1. Get Wishlist (Protected)
router.get("/list/:email", verifyToken, async (req, res) => {
  try {
    const items = await WishlistItem.find({ email: req.params.email });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
});

// 2. Add to Wishlist (Protected + Image Support)
router.post("/add", verifyToken, upload.single("image"), async (req, res) => {
  const { itemName, price, notes } = req.body;
  const email = req.user.email; // Securely get email from token
  const imageUrl = req.file?.path;

  if (!itemName) {
    return res.status(400).json({ message: "Item name is required" });
  }

  try {
    const newItem = new WishlistItem({ email, itemName, price, notes, imageUrl });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
});

// 3. Delete from Wishlist
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await WishlistItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
});

// 4. MAGIC FEATURE: Move to Closet (Mark as Purchased)
router.post("/move-to-closet/:id", verifyToken, async (req, res) => {
  try {
    // A. Find the item in wishlist
    const wishItem = await WishlistItem.findById(req.params.id);
    if (!wishItem) return res.status(404).json({ message: "Item not found" });

    // B. Create a new Closet Item from it
    const newClosetItem = new ClosetItem({
      email: wishItem.email,
      clothName: wishItem.itemName,
      category: "New Buy", // Default category, user can change later
      imageUrl: wishItem.imageUrl,
      wearCount: 0
    });
    await newClosetItem.save();

    // C. Delete from Wishlist
    await WishlistItem.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Moved to closet successfully!", newClosetItem });
  } catch (error) {
    res.status(500).json({ message: "Error moving item", error });
  }
});

module.exports = router;