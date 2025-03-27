const Doctor = require("../models/Doctor");
const Availability = require("../models/Availability");

const getDoctors = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        const doctors = await Doctor.find();

        const doctorsWithSlots = await Promise.all(
            doctors.map(async (doctor) => {
                const availability = await Availability.findOne({
                    doctorName: doctor.name,
                    date: date,
                });

                return {
                    _id: doctor._id,
                    name: doctor.name,
                    specialization: doctor.specialization,
                    availableSlots: availability ? availability.availableSlots : [],
                };
            })
        );

        res.json(doctorsWithSlots);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ error: "Failed to fetch doctors" });
    }
};

// ✅ Ensure correct export
module.exports = { getDoctors };
