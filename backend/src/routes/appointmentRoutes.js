const express = require("express");
const {
  bookAppointment,
  getAppointments,
  rescheduleAppointment,
  cancelAppointment,
  getUpcomingAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/all", getAppointments);
router.put("/reschedule/:id", rescheduleAppointment);
router.delete("/cancel/:id", cancelAppointment);
router.get("/upcoming", getUpcomingAppointments);

module.exports = router;
