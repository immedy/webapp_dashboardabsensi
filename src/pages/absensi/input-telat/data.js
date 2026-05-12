import dayjs from 'dayjs';

export const pegawaiData = [
  {
    id: 1,
    nip: '198711082024211005',
    nama: 'Muhammad Gufran',
    ruangan: 'Bidang Pelayanan Medis',
    jabatan: 'Dokter'
  },
  {
    id: 2,
    nip: 'HI99507032024022002',
    nama: 'Rinda Nugrahini',
    ruangan: 'Poliklinik Anak',
    jabatan: 'Dokter'
  },
  {
    id: 3,
    nip: 'HI99801202024022003',
    nama: 'Widia Rahmadhani',
    ruangan: 'Poliklinik Penyakit Dalam',
    jabatan: 'Dokter'
  },
  {
    id: 4,
    nip: 'HI99604112022011004',
    nama: 'Daniel Aprianto Sihotang',
    ruangan: 'IGD',
    jabatan: 'Dokter'
  },
  {
    id: 5,
    nip: 'HI99412142022012003',
    nama: 'Ni Made Hendrayati Surany',
    ruangan: 'Rawat Jalan',
    jabatan: 'Dokter'
  },
  {
    id: 6,
    nip: 'HI99505192022071013',
    nama: 'Peter Turmandito',
    ruangan: 'Bedah Sentral',
    jabatan: 'Dokter'
  },
  {
    id: 7,
    nip: '199003072024212001',
    nama: 'Iyut Arfianti Putri Anwar',
    ruangan: 'Depo Farmasi Rawat Inap',
    jabatan: 'Apoteker'
  },
  {
    id: 8,
    nip: '199209042024212006',
    nama: 'Putri Rizki Sari',
    ruangan: 'Depo Farmasi Rawat Jalan',
    jabatan: 'Apoteker'
  }
];

export const initialPresensiLogs = [
  { id: 1, pegawaiId: 1, status: 'Pulang', tanggal: '2026-05-11', jam: '16:38', keterangan: '' },
  { id: 2, pegawaiId: 1, status: 'Masuk', tanggal: '2026-05-11', jam: '07:39', keterangan: '' },
  { id: 3, pegawaiId: 1, status: 'Pulang', tanggal: '2026-04-30', jam: '16:32', keterangan: '' },
  { id: 4, pegawaiId: 1, status: 'Masuk', tanggal: '2026-04-30', jam: '08:24', keterangan: '' },
  { id: 5, pegawaiId: 1, status: 'Pulang', tanggal: '2026-04-29', jam: '16:32', keterangan: '' },
  { id: 6, pegawaiId: 1, status: 'Masuk', tanggal: '2026-04-29', jam: '07:44', keterangan: '' },
  { id: 7, pegawaiId: 1, status: 'Pulang', tanggal: '2026-04-28', jam: '16:34', keterangan: '' },
  { id: 8, pegawaiId: 1, status: 'Masuk', tanggal: '2026-04-28', jam: '08:33', keterangan: '' },
  { id: 9, pegawaiId: 1, status: 'Pulang', tanggal: '2026-04-27', jam: '16:32', keterangan: '' },
  { id: 10, pegawaiId: 1, status: 'Masuk', tanggal: '2026-04-27', jam: '07:59', keterangan: '' },
  { id: 11, pegawaiId: 1, status: 'Pulang', tanggal: '2026-04-24', jam: '16:36', keterangan: '' },
  { id: 12, pegawaiId: 2, status: 'Masuk', tanggal: '2026-05-11', jam: '07:20', keterangan: 'Input manual karena perangkat offline.' },
  { id: 13, pegawaiId: 2, status: 'Pulang', tanggal: '2026-05-11', jam: '16:15', keterangan: '' },
  { id: 14, pegawaiId: 3, status: 'Masuk', tanggal: '2026-05-10', jam: '07:45', keterangan: '' }
];

export const jadwalPegawaiData = {
  1: [
    { id: 1, jadwal: 'Paramedis_Malam', tanggal: '2026-04-28' },
    { id: 2, jadwal: 'Paramedis_Malam', tanggal: '2026-04-27' },
    { id: 3, jadwal: 'Paramedis_Pagi', tanggal: '2026-04-26' },
    { id: 4, jadwal: 'Paramedis_Pagi', tanggal: '2026-04-25' },
    { id: 5, jadwal: 'Paramedis_Siang', tanggal: '2026-04-24' },
    { id: 6, jadwal: 'Paramedis_Siang', tanggal: '2026-04-23' },
    { id: 7, jadwal: 'Paramedis_Malam', tanggal: '2026-04-20' },
    { id: 8, jadwal: 'Paramedis_Malam', tanggal: '2026-04-19' },
    { id: 9, jadwal: 'Paramedis_Pagi', tanggal: '2026-04-18' },
    { id: 10, jadwal: 'Paramedis_Pagi', tanggal: '2026-04-17' },
    { id: 11, jadwal: 'Paramedis_Siang', tanggal: '2026-04-16' },
    { id: 12, jadwal: 'Paramedis_Siang', tanggal: '2026-04-15' }
  ],
  2: [
    { id: 13, jadwal: 'Poliklinik_Pagi', tanggal: '2026-05-11' },
    { id: 14, jadwal: 'Poliklinik_Siang', tanggal: '2026-05-10' },
    { id: 15, jadwal: 'Poliklinik_Pagi', tanggal: '2026-05-09' }
  ],
  3: [
    { id: 16, jadwal: 'Poliklinik_Pagi', tanggal: '2026-05-10' },
    { id: 17, jadwal: 'Poliklinik_Siang', tanggal: '2026-05-09' }
  ]
};

export const defaultPresensiForm = {
  status: 'Masuk',
  tanggal: dayjs().format('YYYY-MM-DD'),
  jam: dayjs().format('HH:mm'),
  keterangan: ''
};
