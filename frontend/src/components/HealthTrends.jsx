import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useUserStore from '../stores/userStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HealthTrends = () => {
  const { user } = useUserStore();

  const bloodPressureData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Systolic',
        data: [120, 125, 118, 122, 119, 121],
        borderColor: '#1CBAB3',
        backgroundColor: 'rgba(28, 186, 179, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Diastolic',
        data: [80, 82, 78, 81, 79, 80],
        borderColor: '#FF5252',
        backgroundColor: 'rgba(255, 82, 82, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const weightData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [user?.patient_weight || 0],
        borderColor: '#FFC233',
        backgroundColor: 'rgba(255, 194, 51, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-dark dark:text-white mb-4">Blood Pressure</h2>
        <Line data={bloodPressureData} options={options} />
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-dark dark:text-white mb-4">Weight Tracking</h2>
        <Line data={weightData} options={options} />
      </div>
    </div>
  );
};

export default HealthTrends;