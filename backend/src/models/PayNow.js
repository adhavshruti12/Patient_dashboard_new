const mongoose = require("mongoose");

const payNowSchema = new mongoose.Schema({
    invoice_id: Number,
    patient_id: Number,
    amount: Number,
    payment_method: String,
    transaction_status: { type: String, default: "Pending" },
    payment_date: { type: Date, default: Date.now },
    reference_number: { type: String, unique: true }
});

module.exports = mongoose.model("paynow", payNowSchema);
