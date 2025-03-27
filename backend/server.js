const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

const appointmentRoutes = require("./src/routes/appointmentRoutes");
const doctorRoutes = require("./src/routes/doctorRoutes");
const filteredDoctorRoutes = require("./src/routes/filteredDoctorRoutes"); // ✅ Fix


const errorHandler = require("./src/middlewares/errorMiddleware");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/filtered-doctors", filteredDoctorRoutes);
app.use("/api", require("./src/routes/billingRoutes"));

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
