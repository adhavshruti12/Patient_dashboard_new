import { NavLink } from 'react-router-dom'
import { 
  FaHome, 
  FaCalendarAlt, 
  FaHistory, 
  FaPrescriptionBottleAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaFileInvoiceDollar,
  FaComments
} from 'react-icons/fa'

const SidebarIcon = ({ icon, text, to }) => (
  <NavLink to={to} className={({ isActive }) => 
    `sidebar-icon group ${isActive ? 'bg-primary text-white' : ''}`
  }>
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </NavLink>
)

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-white dark:bg-dark text-dark dark:text-white shadow-lg z-10">
      <div className="flex items-center justify-center h-16 w-full">
        <img src="/logo.svg" alt="YouMedi Logo" className="h-10 w-10" />
      </div>
      <div className="flex flex-col items-center">
        <SidebarIcon icon={<FaHome size="20" />} text="Dashboard" to="/dashboard" />
        <SidebarIcon icon={<FaCalendarAlt size="20" />} text="Appointments" to="/my-appointments" />
        <SidebarIcon icon={<FaHistory size="20" />} text="Medical History" to="/medical-history" />
        <SidebarIcon icon={<FaPrescriptionBottleAlt size="20" />} text="Prescriptions" to="/prescriptions" />
        <SidebarIcon icon={<FaFileInvoiceDollar size="20" />} text="Billing" to="/billing" />
        <SidebarIcon icon={<FaComments size="20" />} text="ChatApp" to="/live-chat" />
        <SidebarIcon icon={<FaUser size="20" />} text="Profile" to="/profile" />
      
      </div>
      <div className="mt-auto mb-4 flex flex-col items-center">
        <SidebarIcon icon={<FaCog size="20" />} text="Settings" to="/settings" />
        <div className="sidebar-icon group">
          <FaSignOutAlt size="20" />
          <span className="sidebar-tooltip group-hover:scale-100">
            Log Out
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar