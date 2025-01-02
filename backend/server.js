const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const closetRoutes = require("./routes/closet");







require("dotenv").config();




const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/closet", closetRoutes);


// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "your_fallback_local_mongo_url"; 

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Routes
app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());
app.use("/api/closet", closetRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));




