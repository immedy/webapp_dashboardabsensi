import { useMemo, useRef, useState } from 'react';
import { Box, Button, IconButton, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate, useParams } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import ActionCell from 'components/tablesearch/ActionCell';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';

dayjs.locale('id');

const pegawaiData = [
  {
    id: 1,
    nama: 'Rahmat Sholeh',
    nip: '199005142025211022',
    ruangan: 'Tim Kerja Sistem Informasi Manajemen Rumah Sakit',
    jabatan: 'Staff'
  },
  {
    id: 2,
    nama: 'Muzi Burrakhman',
    nip: 'HI98812172015111047',
    ruangan: 'Tim Kerja Sistem Informasi Manajemen Rumah Sakit',
    jabatan: 'Staff'
  },
  {
    id: 3,
    nama: 'Ragil M. Rivandi',
    nip: 'HI99204042015111083',
    ruangan: 'Tim Kerja Sistem Informasi Manajemen Rumah Sakit',
    jabatan: 'Kepala Unit/Tim Kerja'
  },
  {
    id: 4,
    nama: 'Muhammad Zaki Kurniawan',
    nip: 'H200106272024081033',
    ruangan: 'Tim Kerja Sistem Informasi Manajemen Rumah Sakit',
    jabatan: 'Staff'
  },
  {
    id: 5,
    nama: 'Wahyudi Muslim',
    nip: 'HI99809032024081031',
    ruangan: 'Tim Kerja Sistem Informasi Manajemen Rumah Sakit',
    jabatan: 'Staff'
  }
];

const draftColumns = [
  { id: 'no', label: 'No.' },
  { id: 'hari', label: 'Hari' },
  { id: 'tanggalShift', label: 'Tanggal Shift' },
  { id: 'jenisShift', label: 'Jenis Shift' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

const savedColumns = [
  { id: 'no', label: 'No.' },
  { id: 'tanggal', label: 'Tanggal' },
  { id: 'shift', label: 'Shift' },
  { id: 'aksi', label: 'Aksi', align: 'center' }
];

const shiftOptions = ['Manajemen', 'Poliklinik', 'Admin Ruangan', 'Laundry_Pagi', 'Laundry_Siang', 'Paramedis_Pagi', 'Paramedis_Siang'];

const initialSavedSchedules = [
  { id: 1, tanggal: '2026-05-29', shift: 'Manajemen' },
  { id: 2, tanggal: '2026-05-28', shift: 'Manajemen' },
  { id: 3, tanggal: '2026-05-27', shift: 'Manajemen' },
  { id: 4, tanggal: '2026-05-26', shift: 'Manajemen' },
  { id: 5, tanggal: '2026-05-25', shift: 'Manajemen' },
  { id: 6, tanggal: '2026-05-22', shift: 'Manajemen' }
];

function getDatesInRange(start, end) {
  const dates = [];
  let current = dayjs(start);
  const last = dayjs(end);

  while (current.isBefore(last) || current.isSame(last, 'day')) {
    dates.push(current);
    current = current.add(1, 'day');
  }

  return dates;
}

function getHariLabel(date) {
  const hariMap = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return hariMap[date.day()];
}

function formatTanggalIndonesia(dateValue) {
  return dayjs(dateValue).locale('id').format('dddd, D MMMM YYYY');
}

function formatRangeLabel(range) {
  if (!range || range.length !== 2 || !range[0] || !range[1]) return '';
  const start = dayjs(range[0]);
  const end = dayjs(range[1]);
  return `${start.format('D MMM YYYY')} - ${end.format('D MMM YYYY')}`;
}

export default function InputJadwalPegawai() {
  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedRange, setSelectedRange] = useState([]);
  const [draftRows, setDraftRows] = useState([]);
  const [savedSchedules, setSavedSchedules] = useState(initialSavedSchedules);

  const pegawai = pegawaiData.find((item) => String(item.id) === String(id)) || pegawaiData[0];
  const selectedRangeLabel = useMemo(() => formatRangeLabel(selectedRange), [selectedRange]);

  const handleGenerateSchedule = () => {
    if (!selectedRange || selectedRange.length !== 2 || !selectedRange[0] || !selectedRange[1]) return;

    const generatedRows = getDatesInRange(selectedRange[0], selectedRange[1]).map((date, index) => ({
      id: `${date.format('YYYY-MM-DD')}-${index}`,
      hari: getHariLabel(date),
      tanggal: date.format('YYYY-MM-DD'),
      jenisShift: 'Manajemen'
    }));

    setDraftRows(generatedRows);
  };

  const handleDraftShiftChange = (rowId, value) => {
    setDraftRows((prev) => prev.map((item) => (item.id === rowId ? { ...item, jenisShift: value } : item)));
  };

  const handleRemoveDraftRow = (rowId) => {
    setDraftRows((prev) => prev.filter((item) => item.id !== rowId));
  };

  const handleResetDraft = () => {
    setDraftRows([]);
    setSelectedRange([]);
  };

  const handleSaveDraft = () => {
    if (!draftRows.length) return;

    const nextRows = draftRows.map((item, index) => ({
      id: `${item.tanggal}-${index}-${Date.now()}`,
      tanggal: item.tanggal,
      shift: item.jenisShift
    }));

    setSavedSchedules((prev) => [...nextRows.reverse(), ...prev]);
    setDraftRows([]);
  };

  const handleDeleteSaved = (rowId) => {
    setSavedSchedules((prev) => prev.filter((item) => item.id !== rowId));
  };

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);

    if (dates.length === 1) {
      window.setTimeout(() => {
        datePickerRef.current?.flatpickr?.open();
      }, 0);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title={pegawai.nama}
          secondary={
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ minWidth: 280 }}>
                <Flatpickr
                  ref={datePickerRef}
                  value={selectedRange}
                  options={{ mode: 'range', dateFormat: 'Y-m-d', closeOnSelect: false }}
                  onChange={handleRangeChange}
                  render={({ defaultValue }, ref) => (
                    <TextField
                      inputRef={ref}
                      defaultValue={defaultValue}
                      value={selectedRangeLabel}
                      label="Range Tanggal"
                      fullWidth
                      placeholder="Pilih range tanggal"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Box>
              <Tooltip title="Tampilkan Form Jadwal">
                <AnimateButton>
                  <IconButton size="large" color="primary" sx={{ boxShadow: 3 }} onClick={handleGenerateSchedule}>
                    <ScheduleOutlined />
                  </IconButton>
                </AnimateButton>
              </Tooltip>
            </Stack>
          }
        >
          <DataTable>
            <TableHead columns={draftColumns} />
            <TableBody>
              {draftRows.length > 0 ? (
                draftRows.map((row, index) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.hari}</TableCell>
                    <TableCell sx={{ minWidth: 220 }}>
                      <TextField fullWidth value={row.tanggal} size="small" disabled />
                    </TableCell>
                    <TableCell sx={{ minWidth: 240 }}>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={row.jenisShift}
                        onChange={(event) => handleDraftShiftChange(row.id, event.target.value)}
                      >
                        {shiftOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <ActionCell align="center">
                      <Tooltip title="Hapus Baris">
                        <IconButton size="large" color="error" onClick={() => handleRemoveDraftRow(row.id)}>
                          <DeleteOutlined />
                        </IconButton>
                      </Tooltip>
                    </ActionCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Pilih range tanggal lalu klik tombol di samping untuk menampilkan form input jadwal.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </DataTable>

          <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 2 }}>
            <Button onClick={() => (draftRows.length ? handleResetDraft() : navigate('/jadwal/jadwal-pegawai'))}>Kembali</Button>
            <AnimateButton>
              <Button variant="contained" onClick={handleSaveDraft} disabled={!draftRows.length}>
                Simpan
              </Button>
            </AnimateButton>
          </Stack>
        </MainCard>
      </Grid>

      <Grid size={12}>
        <MainCard title="Absensi">
          <DataTable>
            <TableHead columns={savedColumns} />
            <TableBody>
              {savedSchedules.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{formatTanggalIndonesia(row.tanggal)}</TableCell>
                  <TableCell>{row.shift}</TableCell>
                  <ActionCell align="center">
                    <Tooltip title="Hapus Jadwal">
                      <IconButton size="large" color="error" onClick={() => handleDeleteSaved(row.id)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </ActionCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </MainCard>
      </Grid>
    </Grid>
  );
}
