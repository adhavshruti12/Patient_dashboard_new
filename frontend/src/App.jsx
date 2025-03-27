import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import MedicalHistory from './pages/MedicalHistory'
import Prescriptions from './pages/Prescriptions'
import Profile from './pages/Profile'
import Billing from './pages/Billing'
import PatientLogin from './pages/PatientLogin'
import PatientRegistration from './pages/PatientRegistration' 
import ChatApp from './pages/ChatApp'; 
import AppointmentBooking from "./pages/AppointmentBooking"; 
import MyAppointments from "./pages/MyAppointments";
import DoctorAvailability from "./components/DoctorAvailability";
import DoctorBookingForm from "./pages/AppointmentBooking"; 

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <AppContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  )
}

function AppContent({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isRegistrationPage = location.pathname === '/register';

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {!isLoginPage && !isRegistrationPage && <Sidebar />}
      <div className="flex flex-col flex-1 overflow-hidden">
        {!isLoginPage && !isRegistrationPage && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        <main className="flex-1 overflow-y-auto bg-neutral-lightest dark:bg-dark-dark p-4">
          <Routes>
            <Route path="/" element={<PatientLogin />} />
            <Route path="/register" element={<PatientRegistration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<AppointmentBooking darkMode={darkMode} />} />
            <Route path="/my-appointments" element={<MyAppointments darkMode={darkMode}/>} />
            <Route path="/doctor-availability" element={<DoctorAvailability />} />
            <Route path="/doctor-form" element={<DoctorBookingForm />} />
            <Route path="/medical-history" element={<MedicalHistory />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/live-chat" element={<ChatApp />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
