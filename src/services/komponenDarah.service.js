import api from '../api/axios';

const ENDPOINT = '/master/golongan_darah';

/**
 * Mapping model UI -> payload API.
 * API menerima `deskripsi`.
 */
const toPayload = (data = {}) => ({
  kode: data.kode ?? '',
  deskripsi: data.deskripsi ?? '',
  keterangan: data.keterangan ?? '',
  masa_simpan: Number(data.masa_simpan ?? 0)
});

export const komponenDarahService = {
  getKomponenDarah: async (params = {}) => {
    const response = await api.get(ENDPOINT, {
      params: {
        page: params.page ?? 1,
        search: params.search ?? ''
      }
    });

    const payload = response.data?.data ?? {};

    return {
      success: true,
      data: {
        items: payload.data ?? [],
        pagination: {
          currentPage: payload.current_page ?? 1,
          lastPage: payload.last_page ?? 1,
          perPage: payload.per_page ?? 10,
          total: payload.total ?? 0
        }
      },
      message: response.data?.message ?? 'Success'
    };
  },

  createKomponenDarah: async (data) => {
    const response = await api.post(ENDPOINT, toPayload(data));

    return {
      success: true,
      data: response.data?.data,
      message: response.data?.message ?? 'Success'
    };
  },

  updateKomponenDarah: async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, toPayload(data));

    return {
      success: true,
      data: response.data?.data,
      message: response.data?.message ?? 'Success'
    };
  },

  deleteKomponenDarah: async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);

    return {
      success: true,
      data: response.data?.data,
      message: response.data?.message ?? 'Success'
    };
  }
};

export default komponenDarahService;
