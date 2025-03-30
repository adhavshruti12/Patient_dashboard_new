import { Link } from 'react-router-dom';
import HealthOverview from '../components/HealthOverview';
import HealthTrends from '../components/HealthTrends';
import useUserStore from '../stores/userStore';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { user, fetchUser } = useUserStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!user && userId && token) {
      fetchUser(userId, token).catch((err) => {
        console.error('Error loading dashboard:', err.message);
        setError('Failed to fetch user data.');
      });
    } else if (!token) {
      setError('Authentication token is missing. Please log in again.');
    }
  }, [user, fetchUser]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-dark dark:text-white">
            Welcome, {user?.patient_fullName || 'Patient'}
          </h1>
          <p className="text-neutral-darkest dark:text-neutral-light">
            Here's your health summary
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <button className="btn btn-primary">Download Health Report</button>
          <Link to="/medical-history" className="btn btn-secondary">
            View Medical History
          </Link>
        </div>
      </div>
      <HealthOverview />
      <HealthTrends />
    </div>
  );
};

export default Dashboard;
