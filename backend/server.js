const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Import Routes
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const doctorRoutes = require("./src/routes/doctorRoutes");
const filteredDoctorRoutes = require("./src/routes/filteredDoctorRoutes");
const prescriptionRoutes = require("./src/routes/prescriptionRoutes"); // ✅ Import new prescription routes

const errorHandler = require("./src/middlewares/errorMiddleware");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Default route to check if server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/filtered-doctors", filteredDoctorRoutes);
app.use("/api/prescriptions", prescriptionRoutes); // ✅ Added route for prescriptions

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
