import api from "../api/axios";

const ENDPOINT = "/master/supplier";

const toPayload = (data = {}) => ({
  nama: data.nama ?? "",
  alamat: data.alamat ?? "",
  no_telp: data.no_telp ?? "",
  email: data.email ?? "",
  status: data.status ?? "aktif"
});

export const supplierDarahService = {
  getSupplierDarah: async (params = {}) => {
    const response = await api.get(ENDPOINT, {
      params: {
        page: params.page ?? 1,
        search: params.search ?? ""
      }
    });

    const payload = response.data?.data ?? {};
    const list = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

    return {
      success: true,
      data: {
        items: list,
        pagination: {
          currentPage: payload.current_page ?? 1,
          lastPage: payload.last_page ?? 1,
          perPage: payload.per_page ?? list.length ?? 10,
          total: payload.total ?? list.length ?? 0
        }
      },
      message: response.data?.message ?? "Success"
    };
  },

  createSupplierDarah: async (data) => {
    const response = await api.post(ENDPOINT, toPayload(data));
    return {
      success: true,
      data: response.data?.data,
      message: response.data?.message ?? "Success"
    };
  }
};
