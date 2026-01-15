import api from '../../api/axios';

export const referenceService = {
  getRuangan: async () => {
    try {
      const res = await api.get('/dashboard/ruangan');
      return res.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Gagal mengambil data ruangan'
      );
    }
  }
};
