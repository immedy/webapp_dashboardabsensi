import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dashboard state for absensi data
  const [absensiData, setAbsensiData] = useState({
    monthlyCI: 0,
    monthlyCO: 0,
    workingDays: 0,
    loadingData: false,
    error: null
  });

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    // Reset absensi data on logout
    setAbsensiData({
      monthlyCI: 0,
      monthlyCO: 0,
      workingDays: 0,
      loadingData: false,
      error: null
    });
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get('/auth/getpegawai');
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('Gagal fetch user', err);
      logout();
    }
  }, [logout]);

  // New function to fetch all dashboard metrics for the logged-in employee
  const fetchAbsensiDashboard = useCallback(async (empId) => {
    if (!empId) return;

    setAbsensiData(prev => ({ ...prev, loadingData: true, error: null }));
    try {
      // Parallel API fetching for faster loading times1
      const [ciRes, coRes, wdRes] = await Promise.all([
        api.get(`/absensi/monthly-ci/${empId}`),
                                                      api.get(`/absensi/monthly-co/${empId}`),
                                                      api.get(`/absensi/working-days/${empId}`)
      ]);

      setAbsensiData({
        monthlyCI: ciRes.data.CheckIn || 0,
        monthlyCO: coRes.data.CheckOut || 0,
        workingDays: wdRes.data.workingDays || 0,
        loadingData: false,
        error: null
      });
    } catch (err) {
      console.error('Gagal mengambil data absensi dashboard:', err);
      setAbsensiData(prev => ({
        ...prev,
        loadingData: false,
        error: err.response?.data?.message || 'Gagal memuat data dashboard'
      }));
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          await fetchUser();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [fetchUser, logout]);

  // Fetch dashboard data automatically whenever the user state becomes available
  useEffect(() => {
    // Assuming your user object contains 'id' or 'pegawai_id'
    const empId = user?.id || user?.pegawai_id;
    if (user && empId) {
      fetchAbsensiDashboard(empId);
    }
  }, [user, fetchAbsensiDashboard]);

  const login = useCallback(async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      const { token } = res.data;

      localStorage.setItem('access_token', token);
      await fetchUser();
    } catch (err) {
      const message = err.response?.data?.message || 'Login gagal, periksa kredensial anda';
  throw new Error(message);
    }
  }, [fetchUser]);

  return (
    <AuthContext.Provider
    value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
      // Added variables to global context
      absensiData,
      refreshDashboard: () => {
        const empId = user?.id || user?.pegawai_id;
        if (empId) fetchAbsensiDashboard(empId);
      }
    }}
    >
    {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
