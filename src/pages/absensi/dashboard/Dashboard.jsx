import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Pagination,
  Paper,
  Autocomplete,
  TextField,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { LoginOutlined, LogoutOutlined, CalendarOutlined, WarningOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BarChart } from '@mui/x-charts/BarChart';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';


// Dummy data for table
const dummyTableData = [
  { id: 1, tanggal: 'Rabu, 6 Mei 2026', jam: '16:52:44', status: 'Pulang' },
  { id: 2, tanggal: 'Rabu, 6 Mei 2026', jam: '07:58:51', status: 'Masuk' },
  { id: 3, tanggal: 'Selasa, 5 Mei 2026', jam: '16:34:35', status: 'Pulang' },
  { id: 4, tanggal: 'Selasa, 5 Mei 2026', jam: '07:53:45', status: 'Masuk' },
  { id: 5, tanggal: 'Senin, 4 Mei 2026', jam: '16:32:01', status: 'Pulang' },
  { id: 6, tanggal: 'Senin, 4 Mei 2026', jam: '07:58:00', status: 'Masuk' },
  { id: 7, tanggal: 'Kamis, 30 April 2026', jam: '16:51:41', status: 'Pulang' },
  { id: 8, tanggal: 'Kamis, 30 April 2026', jam: '07:54:20', status: 'Masuk' },
  { id: 9, tanggal: 'Rabu, 29 April 2026', jam: '16:34:15', status: 'Pulang' },
  { id: 10, tanggal: 'Rabu, 29 April 2026', jam: '07:42:05', status: 'Masuk' },
];

// Dummy data for room chart
const roomData = [
  { room: 'IGD', value: 12 },
  { room: 'Mobilisasi Dana', value: 7 },
  { room: 'Gudang Farmasi', value: 7 },
  { room: 'Prasarana', value: 5 },
  { room: 'SDM', value: 4 },
  { room: 'Pengadaan Aset', value: 4 },
  { room: 'Komite Mutu', value: 3 },
  { room: 'Gawat Darurat', value: 3 },
  { room: 'Rawat Inap', value: 2 },
  { room: 'Promosi Kesehatan', value: 2 },
];

// Dummy data for employee chart
const employeeData = [
  { name: 'Nurul Hatimah', value: 410 },
  { name: 'Sri Sundari', value: 360 },
  { name: 'Suhaidi', value: 70 },
  { name: 'Marliyana', value: 55 },
  { name: 'Beni Rahman', value: 55 },
  { name: 'Mirna Hidayati', value: 50 },
  { name: 'M. Ali Yus..', value: 45 },
  { name: 'Muzi Burrakhman', value: 42 },
  { name: 'Farida Aryani', value: 40 },
  { name: 'Eka Nur Afriani', value: 40 },
];

const Dashboard = () => {
  const { logout ,user, absensiData } = useAuth();
  const [page, setPage] = useState(1);
  const [filterDate, setFilterDate] = useState(new Date());

  return (
    <Grid container spacing={3} alignItems="stretch">
      {/* KIRI - SUMMARY */}
      <Grid size={{ xs: 12, md: 4, xl: 4 }}>
        <Card sx={{
          borderRadius: 2,
          overflow: 'visible',
          position: 'relative',
          bgcolor: '#1890ff',
          color: 'white',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ p: 3, pb: 8 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" color="inherit">Absensi Summary</Typography>
              <Chip label="Personal" size="small" sx={{ bgcolor: 'white', color: '#1890ff', fontWeight: 'bold' }} />
            </Stack>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="subtitle1" color="inherit" sx={{ opacity: 0.8 }}>Aktivitas Terakhir</Typography>
              <Typography variant="h2" color="inherit" sx={{ fontWeight: 600, my: 1 }}>16:52:44</Typography>
              <Typography variant="body1" color="inherit">Absen Pulang</Typography>
            </Box>
          </Box>

          <Card sx={{
            mx: 2,
            mb: 2,
            mt: -4,
            borderRadius: 2,
            boxShadow: 3,
            position: 'relative',
            zIndex: 1,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: '#e6f7ff', color: '#1890ff', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  RR
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{user?.nama_lengkap}</Typography>
                  <Typography variant="body2" color="textSecondary">{user?.nip}</Typography>
                </Box>
              </Stack>

              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: '#e6f7ff', color: '#1890ff', width: 48, height: 48 }} variant="rounded">
                    <LoginOutlined style={{ fontSize: '1.2rem' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{absensiData.loadingData ? '...' : absensiData.monthlyCI}</Typography>
                    <Typography variant="body2" color="textSecondary">Total absen masuk</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: '#f9f0ff', color: '#722ed1', width: 48, height: 48 }} variant="rounded">
                    <LogoutOutlined style={{ fontSize: '1.2rem' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{absensiData.loadingData ? '...' : absensiData.monthlyCO}</Typography>
                    <Typography variant="body2" color="textSecondary">Total absen pulang</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: '#f6ffed', color: '#52c41a', width: 48, height: 48 }} variant="rounded">
                    <CalendarOutlined style={{ fontSize: '1.2rem' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{absensiData.loadingData ? '...' : absensiData.workingDays}</Typography>
                    <Typography variant="body2" color="textSecondary">Jumlah Hari Kerja</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: '#fff1f0', color: '#f5222d', width: 48, height: 48 }} variant="rounded">
                    <WarningOutlined style={{ fontSize: '1.2rem' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>0 menit</Typography>
                    <Typography variant="body2" color="textSecondary">Jumlah Total Telat</Typography>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Card>
      </Grid>

      {/* KANAN - TABEL */}
      <Grid size={{ xs: 12, md: 8, xl: 8 }}>
        <MainCard content={false} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 3, pb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Riwayat Absensi Terkini</Typography>
            <Typography variant="body2" color="textSecondary">Data absensi pegawai yang sedang login</Typography>
          </Box>
          <TableContainer sx={{ flexGrow: 1 }}>
            <Table sx={{ width: '100%', minWidth: 500 }} aria-label="riwayat absensi table">
              <TableHead sx={{ bgcolor: '#fafafa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: '#595959' }}>NO</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#595959' }}>TANGGAL</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#595959' }}>JAM</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#595959' }}>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyTableData.map((row) => (
                  <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.tanggal}</TableCell>
                    <TableCell>{row.jam}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          color: row.status === 'Masuk' ? '#1890ff' : '#722ed1',
                          bgcolor: row.status === 'Masuk' ? '#e6f7ff' : '#f9f0ff',
                          borderRadius: 1,
                          fontWeight: 'bold',
                          px: 1
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', mt: 'auto' }}>
            <Typography variant="body2" color="textSecondary">
              Menampilkan 10 data dari total 781 log absensi.
            </Typography>
            <Pagination count={79} page={page} onChange={(e, val) => setPage(val)} color="primary" shape="rounded" />
          </Box>
        </MainCard>
      </Grid>

      {/* BAWAH - CHARTS */}
      <Grid size={{ xs: 12, md: 6 }}>
        <MainCard content={false} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ p: 3, pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Sebaran Telat per Ruangan</Typography>
            <Typography variant="body2" color="textSecondary">Jumlah pegawai telat check-in berdasarkan ruangan</Typography>
          </Box>
          <Box sx={{ p: 2, flexGrow: 1, height: 350 }}>
            <BarChart
              dataset={roomData}
              xAxis={[
                {
                  scaleType: 'band',
                  dataKey: 'room',
                  tickLabelStyle: { angle: 45, textAnchor: 'start', fontSize: 11 }
                }
              ]}
              series={[{ dataKey: 'value', color: '#fadb14' }]}
              height={320}
              margin={{ top: 20, bottom: 30, left: 0, right: 10 }}
              slotProps={{ legend: { hidden: true } }}
            />
          </Box>
        </MainCard>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <MainCard content={false} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ p: 3, pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Keterlambatan Pegawai Hari ini</Typography>
            <Typography variant="body2" color="textSecondary">Urutan menit keterlambatan check-in terbesar</Typography>
          </Box>
          <Box sx={{ p: 2, flexGrow: 1, height: 350 }}>
            <BarChart
              dataset={employeeData}
              yAxis={[
                {
                  scaleType: 'band',
                  dataKey: 'name',
                  tickLabelStyle: { display: 'none' }
                }
              ]}
              layout="horizontal"
              series={[{ dataKey: 'value', color: '#ff4d4f' }]}
              height={320}
              margin={{ top: 20, bottom: 30, left: 0, right: 10 }}
              slotProps={{ legend: { hidden: true } }}
            />
          </Box>
        </MainCard>
      </Grid>

      {/* BAWAH - TABEL DETAIL KETERLAMBATAN */}
      <Grid size={12}>
        <MainCard title="Rekap Detail Keterlambatan Pegawai">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems="stretch">
            <Autocomplete
              sx={{ width: { xs: '100%', sm: 250 } }}
              options={[
                'Nurul Hatimah', 'Sri Sundari', 'Suhaidi', 'Marliyana',
                'Beni Rahman', 'Mirna Hidayati', 'M. Ali Yus..', 'Muzi Burrakhman',
                'Farida Aryani', 'Eka Nur Afriani'
              ]}
              renderInput={(params) => (
                <TextField {...params} label="Cari Nama Pegawai..." variant="outlined" />
              )}
            />
            <Autocomplete
              sx={{ width: { xs: '100%', sm: 250 } }}
              options={[
                'IGD', 'Mobilisasi Dana', 'Gudang Farmasi', 'Prasarana',
                'SDM', 'Pengadaan Aset', 'Komite Mutu', 'Gawat Darurat',
                'Rawat Inap', 'Promosi Kesehatan'
              ]}
              renderInput={(params) => (
                <TextField {...params} label="Filter Ruangan" variant="outlined" />
              )}
            />
            <Flatpickr
              value={filterDate}
              options={{ dateFormat: 'd/m/Y' }}
              onChange={([date]) => setFilterDate(date)}
              render={({ defaultValue }, ref) => (
                <TextField
                  inputRef={ref}
                  defaultValue={defaultValue}
                  label="Filter Tanggal"
                  variant="outlined"
                  sx={{ width: { xs: '100%', sm: 250 } }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <CalendarOutlined style={{ color: '#8c8c8c' }} />
                  }}
                />
              )}
            />
          </Stack>

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="tabel detail keterlambatan">
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: '#8c8c8c' }}>No</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8c8c8c' }}>Pegawai</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8c8c8c' }}>Ruangan</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8c8c8c' }}>Jadwal</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8c8c8c' }}>Jam Shift</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8c8c8c' }}>Check In</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8c8c8c' }}>Telat</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8c8c8c' }}>Check Out</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { id: 1, nama: 'Ade Candra Saputra', nip: '199201192024211002', ruangan: 'Instalasi Gawat Darurat', jadwal: 'Manajemen', shift: '08:00:00 - 16:30:00', shiftHari: 'Hari yang sama', checkIn: '07:25:00', telat: 'Tepat Waktu', checkOut: '15:37:31' },
                  { id: 2, nama: 'Ade Nurfadillah', nip: 'H200103172024072025', ruangan: 'Tim Kerja Admisi dan Pelayanan Pelanggan', jadwal: 'Manajemen', shift: '08:00:00 - 16:30:00', shiftHari: 'Hari yang sama', checkIn: '07:27:33', telat: 'Tepat Waktu', checkOut: '16:02:34' },
                  { id: 3, nama: 'Adeline Nurul Hasanah', nip: 'H199104022024122040', ruangan: '-', jadwal: 'Manajemen', shift: '08:00:00 - 16:30:00', shiftHari: 'Hari yang sama', checkIn: 'Belum Absen', telat: 'Belum Absen', checkOut: 'Belum Absen' },
                  { id: 4, nama: 'Beni Rahman', nip: 'H199201012024011001', ruangan: 'SDM', jadwal: 'Manajemen', shift: '08:00:00 - 16:30:00', shiftHari: 'Hari yang sama', checkIn: '08:15:00', telat: '15 Menit', checkOut: 'Belum Absen' },
                  { id: 5, nama: 'Suhaidi', nip: '198502122010121003', ruangan: 'Gudang Farmasi', jadwal: 'Manajemen', shift: '08:00:00 - 16:30:00', shiftHari: 'Hari yang sama', checkIn: '08:40:00', telat: '40 Menit', checkOut: '16:45:00' },
                ].map((row, index) => {

                  const renderChip = (val, type) => {
                    if (val === 'Belum Absen') {
                      return <Chip label={val} size="small" sx={{ bgcolor: '#fffbe6', color: '#faad14', fontWeight: 600, borderRadius: 1 }} />;
                    }
                    if (type === 'shift') {
                      return <Chip label={val} size="small" sx={{ bgcolor: '#e6f7ff', color: '#1890ff', fontWeight: 600, borderRadius: 1 }} />;
                    }
                    if (type === 'checkin' || val === 'Tepat Waktu') {
                      return <Chip label={val} size="small" sx={{ bgcolor: '#f6ffed', color: '#52c41a', fontWeight: 600, borderRadius: 1 }} />;
                    }
                    if (type === 'checkout') {
                      return <Chip label={val} size="small" sx={{ bgcolor: '#f9f0ff', color: '#722ed1', fontWeight: 600, borderRadius: 1 }} />;
                    }
                    if (type === 'telat') {
                      return <Chip label={val} size="small" sx={{ bgcolor: '#fff1f0', color: '#f5222d', fontWeight: 600, borderRadius: 1 }} />;
                    }
                    return val;
                  };

                  return (
                    <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px dashed #f0f0f0' } }}>
                      <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{row.nama}</Typography>
                        <Typography variant="caption" color="textSecondary">NIP: {row.nip}</Typography>
                      </TableCell>
                      <TableCell sx={{ color: '#595959' }}>{row.ruangan}</TableCell>
                      <TableCell sx={{ color: '#595959' }}>{row.jadwal}</TableCell>
                      <TableCell>
                        <Stack spacing={0.5} alignItems="flex-start">
                          {renderChip(row.shift, 'shift')}
                          <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>{row.shiftHari}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{renderChip(row.checkIn, 'checkin')}</TableCell>
                      <TableCell>{renderChip(row.telat, 'telat')}</TableCell>
                      <TableCell>{renderChip(row.checkOut, 'checkout')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0' }}>
            <Typography variant="body2" color="textSecondary">
              Menampilkan 1-10 dari 45 data pegawai telat
            </Typography>
            <Pagination count={5} color="primary" shape="rounded" />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
