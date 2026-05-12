import { useMemo, useState } from 'react';
import { Box, Button, Checkbox, Chip, Pagination, Stack, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

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

const initialLogData = [
  { id: 1, pegawaiId: 1, tanggalJam: '2026-05-08 16:33:53', status: 'pulang' },
  { id: 2, pegawaiId: 1, tanggalJam: '2026-05-08 07:24:27', status: 'masuk' },
  { id: 3, pegawaiId: 1, tanggalJam: '2026-05-07 17:17:10', status: 'pulang' },
  { id: 4, pegawaiId: 1, tanggalJam: '2026-05-07 07:43:35', status: 'masuk' },
  { id: 5, pegawaiId: 1, tanggalJam: '2026-05-06 17:12:09', status: 'pulang' },
  { id: 6, pegawaiId: 1, tanggalJam: '2026-05-06 07:15:01', status: 'masuk' },
  { id: 7, pegawaiId: 1, tanggalJam: '2026-05-05 17:19:08', status: 'pulang' },
  { id: 8, pegawaiId: 1, tanggalJam: '2026-05-05 07:55:19', status: 'masuk' },
  { id: 9, pegawaiId: 1, tanggalJam: '2026-05-04 16:46:03', status: 'pulang' },
  { id: 10, pegawaiId: 1, tanggalJam: '2026-05-04 07:52:47', status: 'masuk' },
  { id: 11, pegawaiId: 2, tanggalJam: '2026-05-08 16:11:25', status: 'pulang' },
  { id: 12, pegawaiId: 2, tanggalJam: '2026-05-08 07:21:11', status: 'masuk' }
];

const columns = [
  { id: 'select', label: '', align: 'center' },
  { id: 'no', label: 'No.' },
  { id: 'pegawai', label: 'Nama Pegawai' },
  { id: 'tanggalJam', label: 'Tanggal/Jam' },
  { id: 'status', label: 'Status', align: 'center' }
];

const rowsPerPage = 10;

function formatTanggalJam(value) {
  return dayjs(value).locale('id').format('dddd, DD MMMM YYYY, HH:mm:ss');
}

function getStatusChipProps(status) {
  if (status === 'masuk') {
    return {
      label: 'Absen Masuk',
      sx: {
        minWidth: 180,
        bgcolor: 'info.lighter',
        color: 'info.dark',
        fontWeight: 600
      }
    };
  }

  return {
    label: 'Absen Pulang',
    sx: {
      minWidth: 180,
      bgcolor: 'secondary.lighter',
      color: 'secondary.dark',
      fontWeight: 600
    }
  };
}

export default function HapusLogAbsenPegawai() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [logData, setLogData] = useState(initialLogData);

  const pegawai = pegawaiData.find((item) => String(item.id) === String(id)) || pegawaiData[0];

  const filteredLogs = useMemo(() => logData.filter((item) => item.pegawaiId === pegawai.id), [logData, pegawai.id]);
  const pageCount = Math.max(1, Math.ceil(filteredLogs.length / rowsPerPage));
  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const allVisibleChecked = paginatedLogs.length > 0 && paginatedLogs.every((row) => selectedIds.includes(row.id));
  const someVisibleChecked = paginatedLogs.some((row) => selectedIds.includes(row.id));

  const handleToggleAllVisible = (checked) => {
    if (checked) {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...paginatedLogs.map((row) => row.id)])));
      return;
    }

    setSelectedIds((prev) => prev.filter((selectedId) => !paginatedLogs.some((row) => row.id === selectedId)));
  };

  const handleToggleRow = (rowId) => {
    setSelectedIds((prev) => (prev.includes(rowId) ? prev.filter((idItem) => idItem !== rowId) : [...prev, rowId]));
  };

  const handleDeleteSelected = () => {
    if (!selectedIds.length) return;

    setLogData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const handleChangePage = (_event, value) => {
    setPage(value);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard title={`Hapus Log Absen - ${pegawai.nama}`}>
          <DataTable>
            <TableHead columns={columns} />
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Checkbox
                    checked={allVisibleChecked}
                    indeterminate={!allVisibleChecked && someVisibleChecked}
                    onChange={(event) => handleToggleAllVisible(event.target.checked)}
                  />
                </TableCell>
                <TableCell colSpan={4} sx={{ color: 'text.secondary' }}>
                  Pilih semua data pada halaman ini
                </TableCell>
              </TableRow>

              {paginatedLogs.map((row, index) => {
                const statusChip = getStatusChipProps(row.status);

                return (
                  <TableRow hover key={row.id}>
                    <TableCell align="center">
                      <Checkbox checked={selectedIds.includes(row.id)} onChange={() => handleToggleRow(row.id)} />
                    </TableCell>
                    <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {pegawai.nama}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {pegawai.nip}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatTanggalJam(row.tanggalJam)}</TableCell>
                    <TableCell align="center">
                      <Chip label={statusChip.label} sx={statusChip.sx} />
                    </TableCell>
                  </TableRow>
                );
              })}

              {paginatedLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Tidak ada log absen yang bisa dihapus.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </DataTable>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, gap: 2, flexWrap: 'wrap' }}>
            <Button onClick={() => navigate('/jadwal/jadwal-pegawai')}>Kembali</Button>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 'auto', flexWrap: 'wrap' }}>
              <Tooltip title={selectedIds.length ? `${selectedIds.length} log dipilih` : 'Belum ada log dipilih'}>
                <Box>
                  <Chip label={`${selectedIds.length} dipilih`} variant="outlined" color={selectedIds.length ? 'error' : 'default'} />
                </Box>
              </Tooltip>
              <AnimateButton>
                <Button color="error" variant="contained" onClick={handleDeleteSelected} disabled={!selectedIds.length}>
                  Hapus Absen
                </Button>
              </AnimateButton>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
            <Pagination color="primary" page={page} count={pageCount} onChange={handleChangePage} />
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
