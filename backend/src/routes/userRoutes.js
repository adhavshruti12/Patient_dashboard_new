const express = require("express");
const User = require("../models/User");
const authenticateUser = require("../middlewares/authMiddleware"); // Correct import
const router = express.Router();

// Route to fetch user data by ID
router.get('/dashboard', authenticateUser, async (req, res) => {
  try {
      const user = await User.findById(req.userId).select('-patient_password'); // Correct model and exclude password
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch patient profile
router.get('/getPatientProfile', authenticateUser, async (req, res) => {
  try {
      const user = await User.findById(req.userId).select('-patient_password'); // Exclude password
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;