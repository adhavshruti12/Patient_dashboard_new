const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    medications: [{ name: String, dosage: String, frequency: String }],
    dateIssued: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
