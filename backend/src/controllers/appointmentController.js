const Appointment = require("../models/appointmentModel"); // Assuming you have an Appointment model

// Book a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { _id, ...appointmentData } = req.body;  // Remove _id if provided
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    res.status(201).json({ success: true, message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: error.message || "Error booking appointment" });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching appointments", error });
  }
};

// Reschedule an appointment
exports.rescheduleAppointment = async (req, res) => {
  try {
    console.log("Rescheduling appointment with ID:", req.params.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }
    console.log("Received data for update:", req.body);

    console.log("Updated Data:", req.body);

    const { id } = req.params;
    const updatedData = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment rescheduled successfully", updatedAppointment });
  } catch (error) {
    console.error("Error rescheduling appointment:", error);  // <-- More debugging info
    res.status(500).json({ success: false, message: "Error rescheduling appointment", error: error.message });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error cancelling appointment", error });
  }
};

// Controller to fetch upcoming appointments
exports.getUpcomingAppointments = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    console.error("User ID is missing in the request");
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    console.log("Fetching upcoming appointments for userId:", userId);

    const upcomingAppointments = await Appointment.find({
      userId,
      date: { $gte: new Date() },
    }).sort({ date: 1 });

    console.log("Fetched upcoming appointments:", upcomingAppointments);

    res.status(200).json(upcomingAppointments);
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    res.status(500).json({ message: "Failed to fetch upcoming appointments" });
  }
};
