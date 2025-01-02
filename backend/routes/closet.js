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

// Stats
router.get("/stats/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // 1. Total Items
    const totalItems = await ClosetItem.countDocuments({ email });

    // 2. Least Worn Items
    const leastWornItems = await ClosetItem.find({ email, wearCount: { $lte: 1 } });

    // 3. Most Popular Items (Most Worn)
    const mostPopularItems = await ClosetItem.find({ email })
      .sort({ wearCount: -1 })
      .limit(3); // You can adjust the limit

    // 4. Category Usage Percentage
    const categoryUsagePercentage = await ClosetItem.aggregate([
      { $match: { email } },
      { $group: { _id: "$category", totalWearCount: { $sum: "$wearCount" } } },
      { $group: { _id: null, total: { $sum: "$totalWearCount" }, categories: { $push: "$$ROOT" } } },
      { $unwind: "$categories" },
      {
        $project: {
          category: "$categories._id",
          percentage: {
            $multiply: [{ $divide: ["$categories.totalWearCount", "$total"] }, 100]
          }
        }
      }
    ]);

    // 5. Unused Items 
    const unusedItems = await ClosetItem.find({ email, wearCount: 0 });

    // Send the aggregated stats
    res.status(200).json({
      totalItems,
      leastWornItems: leastWornItems.map(item => ({ name: item.clothName, imageUrl: item.imageUrl })),
      mostPopularItems: mostPopularItems.map(item => ({ name: item.clothName, imageUrl: item.imageUrl })),
      categoryUsagePercentage,
      unusedItems: unusedItems.length,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stats", error });
  }
});


module.exports = router;


