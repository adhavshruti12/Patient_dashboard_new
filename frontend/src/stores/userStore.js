import { create } from 'zustand';

const BASE_URL = "http://localhost:5000";

const useUserStore = create((set) => ({
  user: null,
  fetchUser: async (userId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/getPatientProfile`, {
        method: 'GET', // Ensure method is GET
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
          'Content-Type': 'application/json', // Ensure correct headers
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      set({ user: userData });
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
}));

export default useUserStore;
