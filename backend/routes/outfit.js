const express = require("express");
const Outfit = require("../models/Outfit");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// 1. Create Outfit
router.post("/create", verifyToken, async (req, res) => {
  const { outfitName, itemIds } = req.body;
  const email = req.user.email;

  if (!outfitName || !itemIds || itemIds.length === 0) {
    return res.status(400).json({ message: "Name and at least one item required." });
  }

  try {
    const newOutfit = new Outfit({ email, outfitName, items: itemIds });
    await newOutfit.save();
    res.status(201).json(newOutfit);
  } catch (error) {
    res.status(500).json({ message: "Error creating outfit", error });
  }
});

// 2. Get User's Outfits (Populated with actual item details)
router.get("/list/:email", verifyToken, async (req, res) => {
  try {
    const outfits = await Outfit.find({ email: req.params.email })
      .populate("items"); // This magic replaces IDs with actual clothing data (images, names)
    res.status(200).json(outfits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching outfits", error });
  }
});

// 3. Delete Outfit
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await Outfit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Outfit deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting outfit", error });
  }
});

module.exports = router;