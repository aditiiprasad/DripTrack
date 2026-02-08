// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const closetRoutes = require("./routes/closet");
const wishlistRoutes = require("./routes/wishlist");
const outfitRoutes = require("./routes/outfit");

require("dotenv").config();

const app = express();

// 1. Middleware (Apply once at the top)
app.use(cors());
app.use(express.json());

// 2. Database Connection
const MONGO_URI = process.env.MONGO_URI; 

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// 3. Routes
app.use("/api/auth", authRoutes);
app.use("/api/closet", closetRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/outfits", outfitRoutes);

// 4. Base Route for Testing
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running 🚀" });
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));