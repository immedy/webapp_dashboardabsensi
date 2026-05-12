import { useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import ActionCell from 'components/tablesearch/ActionCell';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import TableSearch from 'components/tablesearch/TableSearch';
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

dayjs.locale('id');

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'pegawai', label: 'Pegawai' },
  { id: 'unitKerja', label: 'Unit/Tim Kerja' },
  { id: 'aksi', label: 'Aksi', align: 'center' }
];

const pegawaiManajemen = [
  {
    id: 1,
    nama: 'Muhammad Gufran',
    nip: '198711082024211005',
    unitKerja: 'Bagian Umum dan Kepegawaian'
  },
  {
    id: 2,
    nama: 'Ni Made Hendrayati Surany',
    nip: 'HI99412142022012003',
    unitKerja: 'Bidang Pelayanan Medis'
  },
  {
    id: 3,
    nama: 'Putri Rizki Sari',
    nip: '199209042024212006',
    unitKerja: 'Depo Farmasi Rawat Jalan'
  },
  {
    id: 4,
    nama: 'Muhammad Ansar',
    nip: 'HI99605192023011002',
    unitKerja: 'Depo Farmasi Kamar Operasi'
  },
  {
    id: 5,
    nama: 'Herman Syam',
    nip: '198510132024211002',
    unitKerja: 'Subbag Perencanaan'
  },
  {
    id: 6,
    nama: 'Sudarmono Z',
    nip: '198803112024211003',
    unitKerja: 'Bidang Penunjang'
  },
  {
    id: 7,
    nama: 'Nurmiati Jafar',
    nip: '198512312024212003',
    unitKerja: 'Keuangan'
  },
  {
    id: 8,
    nama: 'Erma Winata',
    nip: '198708182024212002',
    unitKerja: 'SIMRS'
  }
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

function toTitleCase(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatHariIndonesia(dateValue) {
  return toTitleCase(dayjs(dateValue).locale('id').format('dddd'));
}

function formatTanggalIndonesia(dateValue) {
  return dayjs(dateValue).locale('id').format('DD MMMM YYYY');
}

function formatRangeLabel(range) {
  if (!range || range.length !== 2 || !range[0] || !range[1]) return '';
  return `${dayjs(range[0]).format('D MMM YYYY')} - ${dayjs(range[1]).format('D MMM YYYY')}`;
}

export default function JadwalManajemen() {
  const datePickerRef = useRef(null);
  const [search, setSearch] = useState('');
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [selectedRange, setSelectedRange] = useState([]);
  const [tanggalRows, setTanggalRows] = useState([]);
  const [checkedTanggalIds, setCheckedTanggalIds] = useState([]);

  const selectedRangeLabel = useMemo(() => formatRangeLabel(selectedRange), [selectedRange]);

  const filteredPegawai = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pegawaiManajemen;

    return pegawaiManajemen.filter(
      (item) =>
        item.nama.toLowerCase().includes(query) ||
        item.nip.toLowerCase().includes(query) ||
        item.unitKerja.toLowerCase().includes(query)
    );
  }, [search]);

  const handleOpenFilterDialog = () => {
    setOpenFilterDialog(true);
  };

  const handleCloseFilterDialog = () => {
    setOpenFilterDialog(false);
  };

  const handleApplyRange = () => {
    if (!selectedRange || selectedRange.length !== 2 || !selectedRange[0] || !selectedRange[1]) return;

    const generatedRows = getDatesInRange(selectedRange[0], selectedRange[1]).map((date, index) => ({
      id: `${date.format('YYYY-MM-DD')}-${index}`,
      tanggal: date.format('YYYY-MM-DD'),
      hari: formatHariIndonesia(date),
      labelTanggal: formatTanggalIndonesia(date)
    }));

    setTanggalRows(generatedRows);
    setCheckedTanggalIds([]);
    setOpenFilterDialog(false);
  };

  const handleToggleTanggal = (rowId) => {
    setCheckedTanggalIds((prev) => (prev.includes(rowId) ? prev.filter((item) => item !== rowId) : [...prev, rowId]));
  };

  const handleDeleteTanggal = (rowId) => {
    setTanggalRows((prev) => prev.filter((item) => item.id !== rowId));
    setCheckedTanggalIds((prev) => prev.filter((item) => item !== rowId));
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
    <>
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 4 }}>
          <MainCard
            content={false}
            sx={{
              height: '100%',
              minHeight: 720,
              borderRadius: 4,
              borderColor: 'rgba(224, 229, 239, 0.9)',
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ px: 3, pt: 3, pb: 2 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Manajemen
                </Typography>
                <Tooltip title="Filter Tanggal">
                  <AnimateButton>
                    <IconButton size="large" color="primary" sx={{ boxShadow: 3 }} onClick={handleOpenFilterDialog}>
                      <AppstoreOutlined />
                    </IconButton>
                  </AnimateButton>
                </Tooltip>
              </Stack>
            </Box>

            <Stack spacing={2} sx={{ px: 3, pb: 3 }}>
              {tanggalRows.length > 0 ? (
                tanggalRows.map((row) => {
                  const isChecked = checkedTanggalIds.includes(row.id);

                  return (
                    <Stack
                      key={row.id}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: isChecked ? 'success.light' : 'divider',
                        bgcolor: isChecked ? 'success.lighter' : 'background.paper'
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          alignSelf: 'stretch',
                          borderRadius: 999,
                          bgcolor: 'success.main'
                        }}
                      />

                      <Checkbox checked={isChecked} onChange={() => handleToggleTanggal(row.id)} />

                      <Box
                        sx={{
                          flexGrow: 1,
                          px: 2,
                          py: 1.5,
                          borderRadius: 3,
                          bgcolor: 'grey.100'
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {row.hari}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {row.labelTanggal}
                        </Typography>
                      </Box>

                      <Tooltip title="Hapus Tanggal">
                        <IconButton color="error" onClick={() => handleDeleteTanggal(row.id)}>
                          <DeleteOutlined />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  );
                })
              ) : (
                <Box
                  sx={{
                    borderRadius: 3,
                    border: '1px dashed',
                    borderColor: 'divider',
                    p: 3,
                    textAlign: 'center',
                    bgcolor: 'grey.50'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Belum ada tanggal jadwal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Klik tombol filter di kanan atas lalu pilih range tanggal untuk membuat daftar jadwal manajemen.
                  </Typography>
                </Box>
              )}
            </Stack>
          </MainCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <MainCard
            title="Jadwal Manajemen"
            secondary={
              <Box sx={{ width: 280 }}>
                <TableSearch value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama/NIP/unit kerja..." />
              </Box>
            }
          >
            <DataTable>
              <TableHead columns={columns} />
              <TableBody>
                {filteredPegawai.map((row, index) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {row.nama}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.nip}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.unitKerja}</TableCell>
                    <ActionCell align="center">
                      <Tooltip title={tanggalRows.length ? `${tanggalRows.length} tanggal siap digunakan` : 'Pilih tanggal terlebih dahulu'}>
                        <Box>
                          <Chip
                            icon={<CalendarOutlined />}
                            label={tanggalRows.length ? `${tanggalRows.length} tanggal` : 'Belum ada tanggal'}
                            color={tanggalRows.length ? 'primary' : 'default'}
                            variant={tanggalRows.length ? 'filled' : 'outlined'}
                          />
                        </Box>
                      </Tooltip>
                    </ActionCell>
                  </TableRow>
                ))}

                {filteredPegawai.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        Data pegawai tidak ditemukan.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </DataTable>
          </MainCard>
        </Grid>
      </Grid>

      <Dialog open={openFilterDialog} onClose={handleCloseFilterDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Filter Tanggal Jadwal Manajemen</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
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

            <Typography variant="body2" color="text.secondary">
              Setelah diterapkan, daftar tanggal di panel kiri akan ditampilkan per hari lengkap dengan nama hari Indonesia.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilterDialog}>Batal</Button>
          <AnimateButton>
            <Button variant="contained" onClick={handleApplyRange} disabled={selectedRange.length !== 2}>
              Terapkan
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
