import { useMemo, useState } from 'react';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';
import ActionCell from 'components/tablesearch/ActionCell';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import TableSearch from 'components/tablesearch/TableSearch';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'pegawai', label: 'Nama Pegawai' },
  { id: 'ruangan', label: 'Ruangan' },
  { id: 'status', label: 'Status', align: 'center' }
];

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

export default function JadwalPegawai() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredPegawai = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pegawaiData;

    return pegawaiData.filter(
      (item) =>
        item.nama.toLowerCase().includes(query) ||
        item.nip.toLowerCase().includes(query) ||
        item.ruangan.toLowerCase().includes(query) ||
        item.jabatan.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Absensi"
          secondary={
            <Box sx={{ width: 280 }}>
              <TableSearch value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama/NIP/ruangan..." />
            </Box>
          }
        >
          <DataTable>
            <TableHead columns={columns} />
            <TableBody>
              {filteredPegawai.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell sx={{ color: 'text.secondary' }}>{index + 1}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {row.nama}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.nip}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {row.ruangan}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.jabatan}
                    </Typography>
                  </TableCell>
                  <ActionCell align="center">
                    <Tooltip title="Input Jadwal Pegawai">
                      <IconButton size="large" color="primary" onClick={() => navigate(`/jadwal/jadwal-pegawai/${row.id}`)}>
                        <CalendarOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="large" color="error" onClick={() => navigate(`/jadwal/jadwal-pegawai/${row.id}/hapus-log`)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </ActionCell>
                </TableRow>
              ))}
              {filteredPegawai.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Chip label="Data tidak ditemukan" variant="outlined" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </DataTable>
        </MainCard>
      </Grid>
    </Grid>
  );
}
