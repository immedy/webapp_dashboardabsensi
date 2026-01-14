import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data user dari API
  const fetchUser = async () => {
    try {
      const res = await api.get('/getpegawai');
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('Gagal fetch user', err);
      logout();
    }
  };

  useEffect(() => {
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
        fetchUser(); // ⬅️ AMBIL DATA USER DARI API
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await api.post('/login', { username, password });
    const { token } = res.data;

    localStorage.setItem('access_token', token);
    await fetchUser(); // ⬅️ setelah login, langsung ambil profil
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
