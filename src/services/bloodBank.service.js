// ==============================|| BLOOD BANK SERVICE ||============================== //
// This service will use mock data for now, ready to be replaced with real API calls

import {
  golonganDarahData,
  rhesusData,
  komponenDarahData,
  supplierData,
  ruanganData,
  bloodData,
  bloodOutData,
  stokOpnameData,
  stokOpnameDetailData,
  getDashboardStats,
  getStockByBloodType
} from '../data/mockData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ==============================|| MASTER DATA SERVICES ||============================== //

export const masterDataService = {
  // Golongan Darah
  getGolonganDarah: async () => {
    await delay();
    return { success: true, data: golonganDarahData };
  },

  // Rhesus
  getRhesus: async () => {
    await delay();
    return { success: true, data: rhesusData };
  },

  // Komponen Darah
  getKomponenDarah: async () => {
    await delay();
    return { success: true, data: komponenDarahData };
  },

  createKomponenDarah: async (data) => {
    await delay();
    const newItem = {
      id: komponenDarahData.length + 1,
      ...data
    };
    komponenDarahData.push(newItem);
    return { success: true, data: newItem };
  },

  updateKomponenDarah: async (id, data) => {
    await delay();
    const index = komponenDarahData.findIndex(item => item.id === id);
    if (index !== -1) {
      komponenDarahData[index] = { ...komponenDarahData[index], ...data };
      return { success: true, data: komponenDarahData[index] };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  deleteKomponenDarah: async (id) => {
    await delay();
    const index = komponenDarahData.findIndex(item => item.id === id);
    if (index !== -1) {
      komponenDarahData.splice(index, 1);
      return { success: true };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  // Supplier/PMI
  getSupplier: async () => {
    await delay();
    return { success: true, data: supplierData };
  },

  createSupplier: async (data) => {
    await delay();
    const newItem = {
      id: supplierData.length + 1,
      ...data,
      status: 'aktif'
    };
    supplierData.push(newItem);
    return { success: true, data: newItem };
  },

  updateSupplier: async (id, data) => {
    await delay();
    const index = supplierData.findIndex(item => item.id === id);
    if (index !== -1) {
      supplierData[index] = { ...supplierData[index], ...data };
      return { success: true, data: supplierData[index] };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  deleteSupplier: async (id) => {
    await delay();
    const index = supplierData.findIndex(item => item.id === id);
    if (index !== -1) {
      supplierData.splice(index, 1);
      return { success: true };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  // Ruangan
  getRuangan: async () => {
    await delay();
    return { success: true, data: ruanganData };
  },

  createRuangan: async (data) => {
    await delay();
    const newItem = {
      id: ruanganData.length + 1,
      ...data,
      status: 'aktif'
    };
    ruanganData.push(newItem);
    return { success: true, data: newItem };
  },

  updateRuangan: async (id, data) => {
    await delay();
    const index = ruanganData.findIndex(item => item.id === id);
    if (index !== -1) {
      ruanganData[index] = { ...ruanganData[index], ...data };
      return { success: true, data: ruanganData[index] };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  deleteRuangan: async (id) => {
    await delay();
    const index = ruanganData.findIndex(item => item.id === id);
    if (index !== -1) {
      ruanganData.splice(index, 1);
      return { success: true };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  }
};

// ==============================|| BLOOD INVENTORY SERVICES ||============================== //

export const bloodInventoryService = {
  // Get all blood
  getAllBlood: async (filters = {}) => {
    await delay();
    let filtered = [...bloodData];

    if (filters.status) {
      filtered = filtered.filter(b => b.status === filters.status);
    }
    if (filters.golongan) {
      filtered = filtered.filter(b => b.golongan === filters.golongan);
    }
    if (filters.komponen) {
      filtered = filtered.filter(b => b.komponen_kode === filters.komponen);
    }

    return { success: true, data: filtered };
  },

  // Get blood by ID
  getBloodById: async (id) => {
    await delay();
    const blood = bloodData.find(b => b.id === id);
    if (blood) {
      return { success: true, data: blood };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  // Create blood (Darah Masuk)
  createBlood: async (data) => {
    await delay();
    const newBlood = {
      id: bloodData.length + 1,
      ...data,
      status: 'tersedia'
    };
    bloodData.push(newBlood);
    return { success: true, data: newBlood };
  },

  // Update blood status
  updateBloodStatus: async (id, status, keterangan = '') => {
    await delay();
    const index = bloodData.findIndex(b => b.id === id);
    if (index !== -1) {
      bloodData[index].status = status;
      bloodData[index].keterangan = keterangan;
      return { success: true, data: bloodData[index] };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  // Get available blood for distribution
  getAvailableBlood: async (golongan = null, rhesus = null, komponen = null) => {
    await delay();
    let available = bloodData.filter(b => b.status === 'tersedia');

    if (golongan) {
      available = available.filter(b => b.golongan === golongan);
    }
    if (rhesus) {
      available = available.filter(b => b.rhesus === rhesus);
    }
    if (komponen) {
      available = available.filter(b => b.komponen_kode === komponen);
    }

    return { success: true, data: available };
  }
};

// ==============================|| BLOOD OUT SERVICES ||============================== //

export const bloodOutService = {
  // Get all blood out transactions
  getAllBloodOut: async () => {
    await delay();
    return { success: true, data: bloodOutData };
  },

  // Create blood out transaction
  createBloodOut: async (data) => {
    await delay();
    const newTransaction = {
      id: bloodOutData.length + 1,
      no_transaksi: `TRX-OUT-${String(bloodOutData.length + 1).padStart(3, '0')}`,
      tanggal: new Date().toISOString().split('T')[0],
      ...data
    };
    bloodOutData.push(newTransaction);

    // Update blood status
    const bloodIndex = bloodData.findIndex(b => b.id === data.darah_id);
    if (bloodIndex !== -1) {
      bloodData[bloodIndex].status = 'keluar';
    }

    return { success: true, data: newTransaction };
  }
};

// ==============================|| STOK OPNAME SERVICES ||============================== //

export const stokOpnameService = {
  // Get all stok opname
  getAllStokOpname: async () => {
    await delay();
    return { success: true, data: stokOpnameData };
  },

  // Get stok opname by ID
  getStokOpnameById: async (id) => {
    await delay();
    const stokOpname = stokOpnameData.find(s => s.id === id);
    if (stokOpname) {
      const details = stokOpnameDetailData.filter(d => d.stok_opname_id === id);
      return { success: true, data: { ...stokOpname, details } };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  // Create new stok opname
  createStokOpname: async (data) => {
    await delay();
    const availableBlood = bloodData.filter(b => b.status === 'tersedia');
    const newStokOpname = {
      id: stokOpnameData.length + 1,
      no_opname: `SO-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(stokOpnameData.length + 1).padStart(3, '0')}`,
      tanggal: new Date().toISOString().split('T')[0],
      total_sistem: availableBlood.length,
      total_fisik: 0,
      selisih: 0,
      status: 'draft',
      approved_by: null,
      approved_at: null,
      ...data
    };
    stokOpnameData.push(newStokOpname);

    // Create details for each available blood
    availableBlood.forEach(blood => {
      stokOpnameDetailData.push({
        id: stokOpnameDetailData.length + 1,
        stok_opname_id: newStokOpname.id,
        darah_id: blood.id,
        no_kantong: blood.no_kantong,
        status_sistem: 'tersedia',
        status_fisik: null,
        keterangan: ''
      });
    });

    return { success: true, data: newStokOpname };
  },

  // Update stok opname detail
  updateStokOpnameDetail: async (id, darahId, statusFisik, keterangan = '') => {
    await delay();
    const index = stokOpnameDetailData.findIndex(d => d.stok_opname_id === id && d.darah_id === darahId);
    if (index !== -1) {
      stokOpnameDetailData[index].status_fisik = statusFisik;
      stokOpnameDetailData[index].keterangan = keterangan;
      return { success: true, data: stokOpnameDetailData[index] };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  },

  // Finalize stok opname
  finalizeStokOpname: async (id, approvedBy) => {
    await delay();
    const index = stokOpnameData.findIndex(s => s.id === id);
    if (index !== -1) {
      const details = stokOpnameDetailData.filter(d => d.stok_opname_id === id);
      const totalFisik = details.filter(d => d.status_fisik === 'ada').length;
      const selisih = stokOpnameData[index].total_sistem - totalFisik;

      stokOpnameData[index].status = 'selesai';
      stokOpnameData[index].total_fisik = totalFisik;
      stokOpnameData[index].selisih = selisih;
      stokOpnameData[index].approved_by = approvedBy;
      stokOpnameData[index].approved_at = new Date().toISOString();

      return { success: true, data: stokOpnameData[index] };
    }
    return { success: false, message: 'Data tidak ditemukan' };
  }
};

// ==============================|| DASHBOARD SERVICES ||============================== //

export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    await delay();
    const stats = getDashboardStats();
    return { success: true, data: stats };
  },

  // Get stock by blood type
  getStockByType: async (golongan, rhesus, komponen = null) => {
    await delay();
    const count = getStockByBloodType(golongan, rhesus, komponen);
    return { success: true, data: count };
  }
};
