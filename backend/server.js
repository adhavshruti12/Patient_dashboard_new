const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./src/config/db");

// Route Imports
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const doctorRoutes = require("./src/routes/doctorRoutes");
const filteredDoctorRoutes = require("./src/routes/filteredDoctorRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const authRoutes = require("./src/routes/authRoutes");

const errorHandler = require("./src/middlewares/errorMiddleware");

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cors()); // Enable CORS

// ✅ Connect to MongoDB
// You can use either `connectDB()` or inline mongoose.connect() like below.
connectDB(); // uses config from ./src/config/db.js

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is running... 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/filtered-doctors", filteredDoctorRoutes);
app.use("/api/payments", paymentRoutes); // 👈 Payment Route

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
