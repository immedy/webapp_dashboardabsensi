// ==============================|| MOCK DATA - BLOOD BANK SYSTEM ||============================== //

// Master Data - Golongan Darah
export const golonganDarahData = [
  { id: 1, kode: 'A', nama: 'A', keterangan: 'Golongan Darah A' },
  { id: 2, kode: 'B', nama: 'B', keterangan: 'Golongan Darah B' },
  { id: 3, kode: 'AB', nama: 'AB', keterangan: 'Golongan Darah AB' },
  { id: 4, kode: 'O', nama: 'O', keterangan: 'Golongan Darah O' }
];

// Master Data - Rhesus
export const rhesusData = [
  { id: 1, kode: '+', nama: 'Positif (+)' },
  { id: 2, kode: '-', nama: 'Negatif (-)' }
];

// Master Data - Komponen Darah
export const komponenDarahData = [
  { id: 1, kode: 'WB', nama: 'Whole Blood', keterangan: 'Darah Lengkap', masa_simpan: 35 },
  { id: 2, kode: 'PRC', nama: 'Packed Red Cell', keterangan: 'Sel Darah Merah', masa_simpan: 42 },
  { id: 3, kode: 'TC', nama: 'Thrombocyte Concentrate', keterangan: 'Konsentrat Trombosit', masa_simpan: 5 },
  { id: 4, kode: 'FFP', nama: 'Fresh Frozen Plasma', keterangan: 'Plasma Beku Segar', masa_simpan: 365 },
  { id: 5, kode: 'CRYO', nama: 'Cryoprecipitate', keterangan: 'Kriopresipitat', masa_simpan: 365 }
];

// Master Data - Supplier/PMI
export const supplierData = [
  { id: 1, kode: 'PMI-001', nama: 'PMI Pusat Jakarta', alamat: 'Jl. Kramat Raya No. 47, Jakarta Pusat', telepon: '021-3901735', email: 'pmipusat@pmi.or.id', status: 'aktif' },
  { id: 2, kode: 'PMI-002', nama: 'PMI Jakarta Selatan', alamat: 'Jl. TB Simatupang, Jakarta Selatan', telepon: '021-7501735', email: 'pmijaksel@pmi.or.id', status: 'aktif' },
  { id: 3, kode: 'PMI-003', nama: 'PMI Jakarta Barat', alamat: 'Jl. S. Parman, Jakarta Barat', telepon: '021-5601735', email: 'pmijakbar@pmi.or.id', status: 'aktif' },
  { id: 4, kode: 'DONOR-001', nama: 'Donor Sukarela', alamat: '-', telepon: '-', email: '-', status: 'aktif' }
];

// Master Data - Ruangan
export const ruanganData = [
  { id: 1, kode: 'IGD-001', nama: 'IGD Lantai 1', jenis: 'IGD', kapasitas: 20, status: 'aktif' },
  { id: 2, kode: 'RI-101', nama: 'Ruang Rawat Inap A', jenis: 'Rawat Inap', kapasitas: 30, status: 'aktif' },
  { id: 3, kode: 'RI-102', nama: 'Ruang Rawat Inap B', jenis: 'Rawat Inap', kapasitas: 25, status: 'aktif' },
  { id: 4, kode: 'ICU-201', nama: 'ICU Lantai 2', jenis: 'ICU', kapasitas: 10, status: 'aktif' },
  { id: 5, kode: 'OK-301', nama: 'Kamar Operasi 1', jenis: 'Operasi', kapasitas: 5, status: 'aktif' },
  { id: 6, kode: 'OK-302', nama: 'Kamar Operasi 2', jenis: 'Operasi', kapasitas: 5, status: 'aktif' },
  { id: 7, kode: 'HEM-401', nama: 'Hemodialisa', jenis: 'Hemodialisa', kapasitas: 15, status: 'aktif' }
];

// Generate random blood data
const generateBloodData = () => {
  const data = [];
  const statuses = ['tersedia', 'keluar', 'expired', 'rusak'];
  
  for (let i = 1; i <= 50; i++) {
    const golongan = golonganDarahData[Math.floor(Math.random() * golonganDarahData.length)];
    const rhesus = rhesusData[Math.floor(Math.random() * rhesusData.length)];
    const komponen = komponenDarahData[Math.floor(Math.random() * komponenDarahData.length)];
    const supplier = supplierData[Math.floor(Math.random() * supplierData.length)];
    
    const tanggalTerima = new Date();
    tanggalTerima.setDate(tanggalTerima.getDate() - Math.floor(Math.random() * 30));
    
    const tanggalExpired = new Date(tanggalTerima);
    tanggalExpired.setDate(tanggalExpired.getDate() + komponen.masa_simpan);
    
    const statusIndex = Math.floor(Math.random() * statuses.length);
    let status = statuses[statusIndex];
    
    // Check if expired
    if (new Date() > tanggalExpired && status === 'tersedia') {
      status = 'expired';
    }
    
    data.push({
      id: i,
      no_kantong: `BD${String(i).padStart(6, '0')}`,
      golongan_id: golongan.id,
      golongan: golongan.nama,
      rhesus_id: rhesus.id,
      rhesus: rhesus.kode,
      komponen_id: komponen.id,
      komponen: komponen.nama,
      komponen_kode: komponen.kode,
      supplier_id: supplier.id,
      supplier: supplier.nama,
      volume: 250 + Math.floor(Math.random() * 150), // 250-400 ml
      tanggal_terima: tanggalTerima.toISOString().split('T')[0],
      tanggal_expired: tanggalExpired.toISOString().split('T')[0],
      status: status,
      keterangan: status === 'rusak' ? 'Kantong bocor' : ''
    });
  }
  
  return data;
};

export const bloodData = generateBloodData();

// Transaksi Darah Keluar
export const bloodOutData = [
  {
    id: 1,
    no_transaksi: 'TRX-OUT-001',
    tanggal: '2026-02-10',
    darah_id: 1,
    no_kantong: 'BD000001',
    golongan: 'A',
    rhesus: '+',
    komponen: 'PRC',
    pasien_nama: 'Ahmad Suryanto',
    pasien_no_rm: 'RM-001234',
    ruangan_id: 1,
    ruangan: 'IGD Lantai 1',
    dokter: 'Dr. Budi Santoso, Sp.PD',
    keterangan: 'Pasien anemia berat',
    petugas: 'Siti Nurhaliza'
  },
  {
    id: 2,
    no_transaksi: 'TRX-OUT-002',
    tanggal: '2026-02-09',
    darah_id: 5,
    no_kantong: 'BD000005',
    golongan: 'O',
    rhesus: '+',
    komponen: 'WB',
    pasien_nama: 'Maria Ulfah',
    pasien_no_rm: 'RM-005678',
    ruangan_id: 5,
    ruangan: 'Kamar Operasi 1',
    dokter: 'Dr. Andi Wijaya, Sp.B',
    keterangan: 'Operasi sectio caesar',
    petugas: 'Dewi Lestari'
  }
];

// Stok Opname
export const stokOpnameData = [
  {
    id: 1,
    no_opname: 'SO-202602-001',
    tanggal: '2026-02-01',
    periode: 'Januari 2026',
    petugas: 'Siti Nurhaliza',
    status: 'selesai',
    total_sistem: 45,
    total_fisik: 44,
    selisih: -1,
    keterangan: 'Stok Opname Rutin Bulanan',
    approved_by: 'Dr. Hendra Gunawan',
    approved_at: '2026-02-01 16:30:00'
  },
  {
    id: 2,
    no_opname: 'SO-202602-002',
    tanggal: '2026-02-11',
    periode: 'Februari 2026 - Week 2',
    petugas: 'Dewi Lestari',
    status: 'draft',
    total_sistem: 38,
    total_fisik: 38,
    selisih: 0,
    keterangan: 'Stok Opname Mingguan',
    approved_by: null,
    approved_at: null
  }
];

// Stok Opname Detail
export const stokOpnameDetailData = [
  { id: 1, stok_opname_id: 1, darah_id: 1, no_kantong: 'BD000001', status_sistem: 'tersedia', status_fisik: 'ada', keterangan: 'Sesuai' },
  { id: 2, stok_opname_id: 1, darah_id: 2, no_kantong: 'BD000002', status_sistem: 'tersedia', status_fisik: 'ada', keterangan: 'Sesuai' },
  { id: 3, stok_opname_id: 1, darah_id: 3, no_kantong: 'BD000003', status_sistem: 'tersedia', status_fisik: 'tidak', keterangan: 'Selisih - kantong tidak ditemukan' }
];

// Dashboard Stats
export const getDashboardStats = () => {
  const availableBlood = bloodData.filter(b => b.status === 'tersedia');
  
  // Group by blood type
  const bloodByType = {};
  availableBlood.forEach(blood => {
    const key = `${blood.golongan}${blood.rhesus}`;
    if (!bloodByType[key]) {
      bloodByType[key] = {
        golongan: blood.golongan,
        rhesus: blood.rhesus,
        components: {}
      };
    }
    if (!bloodByType[key].components[blood.komponen_kode]) {
      bloodByType[key].components[blood.komponen_kode] = 0;
    }
    bloodByType[key].components[blood.komponen_kode]++;
  });
  
  // Expiring soon (within 3 days)
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  
  const expiringSoon = availableBlood.filter(blood => {
    const expDate = new Date(blood.tanggal_expired);
    return expDate >= today && expDate <= threeDaysLater;
  });
  
  const expired = bloodData.filter(b => b.status === 'expired');
  const distributed = bloodData.filter(b => b.status === 'keluar');
  
  return {
    totalStok: availableBlood.length,
    totalExpired: expired.length,
    totalDistributed: distributed.length,
    expiringSoon: expiringSoon.length,
    bloodByType,
    expiringSoonList: expiringSoon
  };
};

// Helper function to get blood stock by type
export const getStockByBloodType = (golongan, rhesus, komponen = null) => {
  let filtered = bloodData.filter(
    b => b.status === 'tersedia' && b.golongan === golongan && b.rhesus === rhesus
  );
  
  if (komponen) {
    filtered = filtered.filter(b => b.komponen_kode === komponen);
  }
  
  return filtered.length;
};
