const express = require("express");
const ClosetItem = require("../models/ClosetItem");
const upload = require("../config/cloudinary");

const router = express.Router();

// Add clothing item to user's closet with image
router.post("/add", upload.single("image"), async (req, res) => {
  const { email, clothName, category } = req.body;
  const imageUrl = req.file?.path; 

  if (!email || !clothName || !category) {
    return res.status(400).json({ message: "Email, cloth name, and category are required." });
  }

  try {
    const closetItem = new ClosetItem({ email, clothName, category, imageUrl });
    await closetItem.save();
    res.status(201).json({ message: "Clothing item added to closet", closetItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding clothing item", error });
  }
});

// Get user's closet items
router.get("/list/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const closetItems = await ClosetItem.find({ email });
    res.status(200).json(closetItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching closet items", error });
  }
});

// Increment the wear count for a clothing item
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedItem = await ClosetItem.findByIdAndUpdate(
      id,
      { $inc: { wearCount: 1 } }, 
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating wear count", error });
  }
});


// Delete clothing item from user's closet
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await ClosetItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting item", error });
  }
});


module.exports = router;


