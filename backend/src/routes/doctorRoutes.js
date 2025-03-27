const express = require("express");
const { getPrescriptions } = require("../controllers/prescriptionController"); // ✅ Correct Import

const router = express.Router();

// Define your doctor-related routes here
router.get("/prescriptions", getPrescriptions); // ✅ Use the function

module.exports = router;
