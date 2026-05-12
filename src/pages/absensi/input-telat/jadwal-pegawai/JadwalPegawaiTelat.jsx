import { useMemo } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import MainCard from 'components/MainCard';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import { jadwalPegawaiData, pegawaiData } from 'pages/absensi/input-telat/data';

dayjs.locale('id');

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'jadwal', label: 'Jadwal Dinas' },
  { id: 'tanggal', label: 'Tanggal' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

function formatTanggalIndonesia(value) {
  return dayjs(value).locale('id').format('dddd, DD MMMM YYYY');
}

export default function JadwalPegawaiTelat() {
  const navigate = useNavigate();
  const { id } = useParams();

  const pegawai = pegawaiData.find((item) => String(item.id) === String(id)) || pegawaiData[0];

  const jadwalRows = useMemo(() => {
    return (jadwalPegawaiData[pegawai.id] || []).slice().sort((a, b) => dayjs(b.tanggal).valueOf() - dayjs(a.tanggal).valueOf());
  }, [pegawai.id]);

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard title={`Jadwal - ${pegawai.nama}`}>
          <DataTable>
            <TableHead columns={columns} />
            <TableBody>
              {jadwalRows.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.jadwal}
                      size="small"
                      sx={{
                        bgcolor: 'success.lighter',
                        color: 'success.main',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {formatTanggalIndonesia(row.tanggal)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}

              {jadwalRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Jadwal pegawai belum tersedia.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </DataTable>

          <Box sx={{ mt: 2 }}>
            <Button onClick={() => navigate('/input-telat')}>Kembali</Button>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}
