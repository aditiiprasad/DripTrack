// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = "aditi"; // Use the same secret as in the routes

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateJWT;
