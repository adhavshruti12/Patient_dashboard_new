import { useState, useEffect } from 'react'
import { FaSearch, FaBell, FaMoon, FaSun } from 'react-icons/fa'
import useUserStore from '../stores/userStore'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, fetchUser } = useUserStore() // Add fetchUser from the store
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Appointment reminder: Dr. Smith tomorrow at 10:00 AM', read: false },
    { id: 2, text: 'New lab results available', read: false },
    { id: 3, text: 'Prescription refill reminder', read: true }
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
    console.log("Navbar retrieved userId:", userId); // Debug log
    if (!user && userId) {
      fetchUser(userId).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    } else if (!userId) {
      console.warn("userId is missing from localStorage. Please log in again."); // Add warning
    }
  }, [user, fetchUser])

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.patient_fullName) return 'U'
    const names = user.patient_fullName.split(' ')
    return names.map(name => name[0]).join('').toUpperCase()
  }

  return (
    <div className="h-16 px-4 flex items-center justify-between bg-white dark:bg-dark border-b border-neutral dark:border-dark-light">
      <div className="flex items-center ml-16">
        <h1 className="text-xl font-semibold text-dark-dark dark:text-white ml-4">Patient Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="py-2 pl-10 pr-4 rounded-full bg-neutral-lightest dark:bg-dark-light text-dark dark:text-white border border-neutral dark:border-dark-light focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-3 text-neutral-darkest dark:text-neutral-light" />
        </div>
        
        <div className="relative">
          <button 
            className="relative p-2 rounded-full hover:bg-neutral-lightest dark:hover:bg-dark-light"
            onClick={handleNotificationClick}
          >
            <FaBell className="text-dark-light dark:text-neutral-light" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-accent rounded-full text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-light rounded-md shadow-lg z-20">
              <div className="p-2 border-b border-neutral dark:border-dark-light">
                <h3 className="font-medium text-dark-dark dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b border-neutral dark:border-dark-light hover:bg-neutral-lightest dark:hover:bg-dark cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p className="text-sm text-dark-dark dark:text-white">{notification.text}</p>
                      {!notification.read && (
                        <span className="inline-block h-2 w-2 bg-primary rounded-full ml-2"></span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-neutral-darkest dark:text-neutral-light">
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <button 
          className="p-2 rounded-full hover:bg-neutral-lightest dark:hover:bg-dark-light"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <FaSun className="text-secondary" />
          ) : (
            <FaMoon className="text-dark-light" />
          )}
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            {getInitials()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-dark-dark dark:text-white">
              {user?.patient_fullName || "User"} 
            </p>
            <p className="text-xs text-neutral-darkest dark:text-neutral-light">Patient</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar