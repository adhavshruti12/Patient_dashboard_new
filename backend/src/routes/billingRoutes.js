const express = require("express");
const router = express.Router();
const PayNow = require("../models/PayNow");

// 📌 Store Billing Data in "Pay Now" Collection
router.post("/pay_now", async (req, res) => {
    try {
        const { invoice_id, patient_id, amount, payment_method } = req.body;
        const reference_number = Math.random().toString(36).substr(2, 10).toUpperCase();

        const newPayment = new PayNow({
            invoice_id,
            patient_id,
            amount,
            payment_method,
            transaction_status: "Pending",
            reference_number
        });

        await newPayment.save();
        res.json({ message: "✅ Payment stored successfully", reference_number });

    } catch (error) {
        res.status(500).json({ error: "❌ Error storing payment data" });
    }
});

// 📌 Fetch First Billing Data
router.get("/first_billing", async (req, res) => {
    try {
        const firstBilling = await PayNow.findOne().sort({ payment_date: 1 });

        if (firstBilling) {
            res.json({ status: "success", billing: firstBilling });
        } else {
            res.json({ status: "error", message: "❌ No billing data found" });
        }
    } catch (error) {
        res.status(500).json({ error: "❌ Error fetching billing data" });
    }
});

module.exports = router;
