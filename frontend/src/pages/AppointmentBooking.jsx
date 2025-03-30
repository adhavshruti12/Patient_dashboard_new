import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AppointmentBooking = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const genders = ["Male", "Female", "Other"];

  const [appointment, setAppointment] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    gender: "",
    date: "",
    time: "",
    department: "",
    doctor: "",
    visitedBefore: false,
    booked: false,
  });

  const departments = {
    Cardiology: ["Dr. Smith", "Dr. Williams"],
    Neurology: ["Dr. Johnson"],
    Dermatology: ["Dr. Brown", "Dr. Davis"],
  };

  const times = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];



  useEffect(() => {
    if (location.state?.appointment) {
      console.log("Received appointment for reschedule:", location.state.appointment); // Debugging
      setAppointment((prev) => ({
        ...prev,
        ...location.state.appointment,
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = appointment.booked
      ? `http://localhost:5000/api/appointments/reschedule/${appointment._id}`
      : "http://localhost:5000/api/appointments/book";

    const method = appointment.booked ? "PUT" : "POST";

    try {
      const response = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });

      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }

      alert(appointment.booked ? "Rescheduled Successfully!" : "Booked Successfully!");
      navigate("/my-appointments");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="px-6 py-4 mt-16">
      <div
        className={`max-w-lg mx-auto p-6 rounded-xl shadow-xl transition-all border-2 
          ${darkMode ? "bg-dark text-white border-[#64CCC5]" : "bg-white text-gray-900 border-[#64CCC5]"}
        `}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">
            {appointment.booked ? "Reschedule Appointment" : "Book an Appointment"}
          </h2>
          <button
            onClick={() => navigate("/my-appointments")}
            className="bg-[#64CCC5] hover:bg-[#4DA9A5] text-white font-semibold py-1 px-2 rounded-md text-xs"
          >
            My Appointments
          </button>
        </div>
  
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input type="text" name="firstName" value={appointment.firstName} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input type="text" name="lastName" value={appointment.lastName} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required />
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input type="text" name="mobile" value={appointment.mobile} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" name="email" value={appointment.email} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required />
            </div>
          </div>
  
          <div className="mt-3">
            <label className="block text-sm font-medium">Gender</label>
            <select name="gender" value={appointment.gender} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required>
              <option value="">Select Gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>
  
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-sm font-medium">Appointment Date</label>
              <input type="date" name="date" value={appointment.date} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Appointment Time</label>
              <input type="time" name="time" value={appointment.time} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required />
            </div>
          </div>
  
          <div className="mt-3">
            <label className="block text-sm font-medium">Department</label>
            <input type="text" name="department" value={appointment.department} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required />
          </div>
  
          <div className="mt-3">
            <label className="block text-sm font-medium">Doctor</label>
            <input type="text" name="doctor" value={appointment.doctor} className="border-2 border-[#64CCC5] p-2 rounded-lg w-full text-sm shadow-md" onChange={handleChange} required />
          </div>
  
          {/* Have You Visited Before? Checkbox */}
          <div className="mt-3 flex items-center">
            <input type="checkbox" name="visitedBefore" checked={appointment.visitedBefore} onChange={handleChange} className="mr-2" />
            <label className="text-sm">Have you visited before?</label>
          </div>
  
          <button type="submit" className="w-full bg-[#64CCC5] hover:bg-[#4DA9A5] text-white font-bold py-2 px-3 rounded-lg text-sm mt-4 shadow-lg">
            {appointment.booked ? "Reschedule Appointment" : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );

};

export default AppointmentBooking;
