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
import FormOutlined from '@ant-design/icons/FormOutlined';
import { pegawaiData } from 'pages/absensi/input-telat/data';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'nip', label: 'NIP' },
  { id: 'nama', label: 'Nama Lengkap' },
  { id: 'ruangan', label: 'Ruangan' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

export default function InputTelat() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredPegawai = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pegawaiData;

    return pegawaiData.filter(
      (item) =>
        item.nip.toLowerCase().includes(query) ||
        item.nama.toLowerCase().includes(query) ||
        item.ruangan.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Pegawai"
          secondary={
            <Box sx={{ width: 280 }}>
              <TableSearch value={search} onChange={(event) => setSearch(event.target.value)} placeholder="NIP atau Nama" />
            </Box>
          }
        >
          <DataTable>
            <TableHead columns={columns} />
            <TableBody>
              {filteredPegawai.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.nip}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {row.nama}
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
                    <Tooltip title="Lihat Jadwal">
                      <IconButton size="large" color="success" onClick={() => navigate(`/input-telat/${row.id}/jadwal`)}>
                        <CalendarOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Lihat Log Presensi">
                      <IconButton size="large" color="primary" onClick={() => navigate(`/input-telat/${row.id}`)}>
                        <FormOutlined />
                      </IconButton>
                    </Tooltip>
                  </ActionCell>
                </TableRow>
              ))}

              {filteredPegawai.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Chip label="Data pegawai tidak ditemukan" variant="outlined" />
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
