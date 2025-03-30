// filepath: e:\Patient_Dashboard\Patient_dashboard_new\frontend\src\stores\userStore.js
async function fetchUpcomingAppointments() {
  try {
    const response = await fetch('/api/appointments/upcoming');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

import { useState } from 'react';
import { FaSearch, FaBell, FaMoon, FaSun } from 'react-icons/fa';
import useUserStore from '../stores/userStore';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, upcomingAppointments } = useUserStore(); // Access upcoming appointments
  const [showNotifications, setShowNotifications] = useState(false); // Toggle dropdown visibility

  const unreadCount = upcomingAppointments.length; // Count all upcoming appointments as unread

  // Toggle notification dropdown
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="h-16 px-4 flex items-center justify-between bg-white dark:bg-dark border-b border-neutral dark:border-dark-light">
      <div className="flex items-center ml-16">
        <h1 className="text-xl font-semibold text-dark-dark dark:text-white ml-4">
          Patient Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 pr-4 rounded-full bg-neutral-lightest dark:bg-dark-light text-dark dark:text-white border border-neutral dark:border-dark-light focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-3 text-neutral-darkest dark:text-neutral-light" />
        </div>

        {/* Notification Bell */}
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

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-light rounded-md shadow-lg z-20">
              <div className="p-2 border-b border-neutral dark:border-dark-light">
                <h3 className="font-medium text-dark-dark dark:text-white">
                  Notifications
                </h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="p-3 border-b border-neutral dark:border-dark-light hover:bg-neutral-lightest dark:hover:bg-dark cursor-pointer"
                    >
                      <p className="text-sm text-dark-dark dark:text-white">
                        Reminder: Appointment with Dr. {appointment.doctor} on{' '}
                        {new Date(appointment.date).toLocaleDateString()} at{' '}
                        {appointment.time}
                      </p>
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

        {/* Dark Mode Toggle */}
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

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            {user?.patient_fullName
              ?.split(' ')
              .map((name) => name[0])
              .join('')
              .toUpperCase() || 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-dark-dark dark:text-white">
              {user?.patient_fullName || 'User'}
            </p>
            <p className="text-xs text-neutral-darkest dark:text-neutral-light">
              Patient
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;