// services/dashboard/dashboard.service.js
import api from '../../api/axios';

export const dashboardService = {
  getAbsen: async (ruanganId = null) => {
    try {
      const res = await api.get('/dashboard/today', {
        params: {
          ruangan_id: ruanganId
        }
      });

      console.log('DASHBOARD SERVICE:', res.data); // DEBUG

      return res.data; // ⬅️ PENTING
    } catch (error) {
      console.error('DASHBOARD ERROR:', error);
      throw new Error(
        error.response?.data?.message || 'Gagal Mengambil Data Absen'
      );
    }
  }
};
