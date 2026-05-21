import React, { useState, useEffect } from 'react';
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
  Autocomplete,
  TextField
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { LoginOutlined, LogoutOutlined, CalendarOutlined, WarningOutlined } from '@ant-design/icons';
import { BarChart } from '@mui/x-charts/BarChart';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

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
  const { logout, user, absensiData, fetchDailyReport } = useAuth();

  // 1. Hook state initialization variables
  const [personalPage, setPersonalPage] = useState(1);
  const [dailyPage, setDailyPage] = useState(1);
  const [filterDate, setFilterDate] = useState(new Date());
  const [searchName, setSearchName] = useState(null);
  const [searchRoom, setSearchRoom] = useState(null);

  const itemsPerPage = 10;

  // =========================================================
  // FIXED INITIALIZATION ORDER: Base arrays defined first
  // =========================================================
  const safeDailyReport = absensiData?.dailyReport || [];

  // Transform the live daily report data into a sorted top 10 list for the chart
  const topLateEmployeesData = safeDailyReport
  .map(row => {
    let minutes = 0;
    // Extract numerical minutes from strings like "15 Menit"
    if (row.telat && row.telat.includes('Menit')) {
      minutes = parseInt(row.telat, 10);
    }
    return {
      // Use the name value provided by your master data join
      name: row.nama,
      value: minutes
    };
  })
  // Filter out those who are on time or haven't checked in yet
  .filter(item => item.value > 0)
  // Sort descending by highest minutes late
  .sort((a, b) => b.value - a.value)
  // Take only the top 10 rank entries
  .slice(0, 10);

  const safeMonthlyLogs = absensiData?.monthlyLogs || [];

  // 2. Extract unique autocomplete option choices safely
  const uniqueNameOptions = Array.from(new Set(safeDailyReport.map(row => row.nama))).sort();
  const uniqueRoomOptions = Array.from(new Set(safeDailyReport.map(row => row.ruangan))).filter(r => r && r !== '-').sort();

  // Helper to convert JavaScript Dates into standard local YYYY-MM-DD strings
  const formatDateString = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Automatically trigger a database re-fetch whenever the calendar filter changes
  useEffect(() => {
    if (filterDate) {
      const formattedDate = formatDateString(filterDate);
      fetchDailyReport(formattedDate);
      setDailyPage(1);
    }
  }, [filterDate, fetchDailyReport]);

  // Filter data based on selected autocomplete options
  const filteredDailyReport = safeDailyReport.filter((row) => {
    const matchName = !searchName || row.nama === searchName;
    const matchRoom = !searchRoom || row.ruangan === searchRoom;
    return matchName && matchRoom;
  });

  // ==========================================
  // TOP TABLE SLICING (PERSONAL LOGS)
  // ==========================================
  const totalPersonalItems = safeMonthlyLogs.length;
  const personalPageCount = Math.ceil(totalPersonalItems / itemsPerPage);
  const displayedPersonalLogs = safeMonthlyLogs.slice(
    (personalPage - 1) * itemsPerPage,
                                                      personalPage * itemsPerPage
  );

  // ==========================================
  // BOTTOM TABLE SLICING (DAILY TEAM REPORT)
  // ==========================================
  const totalDailyItems = filteredDailyReport.length;
  const dailyPageCount = Math.ceil(totalDailyItems / itemsPerPage);
  const displayedDailyReport = filteredDailyReport.slice(
    (dailyPage - 1) * itemsPerPage,
                                                         dailyPage * itemsPerPage
  );

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
    <Typography variant="h2" color="inherit" sx={{ fontWeight: 600, my: 1 }}>{absensiData?.loadingData ? '...' : (absensiData?.lastAbsensiTime || 'No Record')}</Typography>
    <Typography variant="body1" color="inherit">
    {absensiData?.loadingData ? '...' : (absensiData?.statusAbsen ? `Absen ${absensiData.statusAbsen}` : '-')}
    </Typography>
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
    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{absensiData?.loadingData ? '...' : absensiData?.monthlyCI}</Typography>
    <Typography variant="body2" color="textSecondary">Total absen masuk</Typography>
    </Box>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
    <Avatar sx={{ bgcolor: '#f9f0ff', color: '#722ed1', width: 48, height: 48 }} variant="rounded">
    <LogoutOutlined style={{ fontSize: '1.2rem' }} />
    </Avatar>
    <Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{absensiData?.loadingData ? '...' : absensiData?.monthlyCO}</Typography>
    <Typography variant="body2" color="textSecondary">Total absen pulang</Typography>
    </Box>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
    <Avatar sx={{ bgcolor: '#f6ffed', color: '#52c41a', width: 48, height: 48 }} variant="rounded">
    <CalendarOutlined style={{ fontSize: '1.2rem' }} />
    </Avatar>
    <Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{absensiData?.loadingData ? '...' : absensiData?.workingDays}</Typography>
    <Typography variant="body2" color="textSecondary">Jumlah Hari Kerja</Typography>
    </Box>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center">
    <Avatar sx={{ bgcolor: '#fff1f0', color: '#f5222d', width: 48, height: 48 }} variant="rounded">
    <WarningOutlined style={{ fontSize: '1.2rem' }} />
    </Avatar>
    <Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{absensiData?.loadingData?'...':absensiData?.totalLateMinutes} menit</Typography>
    <Typography variant="body2" color="textSecondary">Jumlah Total Telat</Typography>
    </Box>
    </Stack>
    </Stack>
    </CardContent>
    </Card>
    </Card>
    </Grid>

    {/* KANAN - TABEL RIWAYAT ABSENSI PERSONAL */}
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
    {absensiData?.loadingData ? (
      <TableRow>
      <TableCell colSpan={4} align="center">Memuat data absensi...</TableCell>
      </TableRow>
    ) : displayedPersonalLogs.length === 0 ? (
      <TableRow>
      <TableCell colSpan={4} align="center">Tidak ada data absensi bulan ini</TableCell>
      </TableRow>
    ) : (
      displayedPersonalLogs.map((row, index) => (
        <TableRow key={row.id || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>{(personalPage - 1) * itemsPerPage + index + 1}</TableCell>
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
      ))
    )}
    </TableBody>
    </Table>
    </TableContainer>
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', mt: 'auto' }}>
    <Typography variant="body2" color="textSecondary">
    Menampilkan {displayedPersonalLogs.length} data dari total {totalPersonalItems} log absensi bulan ini.
    </Typography>
    <Pagination
    count={personalPageCount || 1}
    page={personalPage}
    onChange={(e, val) => setPersonalPage(val)}
    color="primary"
    shape="rounded"
    />
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
    <Typography variant="body2" color="textSecondary">10 besar menit keterlambatan check-in tertinggi</Typography>
    </Box>
    <Box sx={{ p: 2, flexGrow: 1, height: 350 }}>
    {topLateEmployeesData.length === 0 ? (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 280 }}>
      <Typography color="textSecondary">Tidak ada data keterlambatan hari ini</Typography>
      </Box>
    ) : (
      <BarChart
      // Swap out the dummy dataset for our live filtered list
      dataset={topLateEmployeesData}
      yAxis={[
        {
          scaleType: 'band',
          dataKey: 'name',
          // Display employee names clearly along the vertical bars axis
          tickLabelStyle: {
            fontSize: 11,
            textAnchor: 'end',
          },
          valueFormatter: (value) => value, // Forces the raw string value to display directly without truncating
        }
      ]}
      layout="horizontal"
      series={[
        {
          dataKey: 'value',
          color: '#ff4d4f',
          valueFormatter: (value) => `${value} Menit`
        }
      ]}
      height={320}
      // Added a left margin padding space so names are not cut off on display boundary
      margin={{ top: 20, bottom: 30, left: 160, right: 20 }}
      slotProps={{ legend: { hidden: true } }}
      />
    )}
    </Box>
    </MainCard>
    </Grid>

    {/* BAWAH - TABEL REKAP DETAIL KETERLAMBATAN PEGAWAI */}
    <Grid size={12}>
    <MainCard title="Rekap Detail Keterlambatan Pegawai">
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems="stretch">
    <Autocomplete
    sx={{ width: { xs: '100%', sm: 250 } }}
    options={uniqueNameOptions}
    value={searchName}
    onChange={(event, newValue) => {
      setSearchName(newValue);
      setDailyPage(1);
    }}
    renderInput={(params) => (
      <TextField {...params} label="Cari Nama Pegawai..." variant="outlined" />
    )}
    />
    <Autocomplete
    sx={{ width: { xs: '100%', sm: 250 } }}
    options={uniqueRoomOptions}
    value={searchRoom}
    onChange={(event, newValue) => {
      setSearchRoom(newValue);
      setDailyPage(1);
    }}
    renderInput={(params) => (
      <TextField {...params} label="Filter Ruangan" variant="outlined" />
    )}
    />
    <Flatpickr
    value={filterDate}
    options={{ dateFormat: 'd/m/Y' }}
    onChange={([date]) => {
      setFilterDate(date);
      setSearchName(null);
      setSearchRoom(null);
    }}
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
    {absensiData?.loadingData ? (
      <TableRow>
      <TableCell colSpan={8} align="center">Memuat rekap data absensi harian...</TableCell>
      </TableRow>
    ) : displayedDailyReport.length === 0 ? (
      <TableRow>
      <TableCell colSpan={8} align="center">Tidak ada jadwal pegawai pada tanggal ini</TableCell>
      </TableRow>
    ) : (
      displayedDailyReport.map((row, index) => {
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
          <TableRow key={row.id || index} hover sx={{ '& td': { borderBottom: '1px dashed #f0f0f0' } }}>
          <TableCell sx={{ fontWeight: 600 }}>{(dailyPage - 1) * itemsPerPage + index + 1}</TableCell>
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
      })
    )}
    </TableBody>
    </Table>
    </TableContainer>

    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0' }}>
    <Typography variant="body2" color="textSecondary">
    Menampilkan {displayedDailyReport.length} dari total {totalDailyItems} data jadwal kerja pegawai pada tanggal terpilih.
    </Typography>
    <Pagination
    count={dailyPageCount || 1}
    page={dailyPage}
    onChange={(e, val) => setDailyPage(val)}
    color="primary"
    shape="rounded"
    />
    </Box>
    </MainCard>
    </Grid>
    </Grid>
  );
};

export default Dashboard;
