import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Chip,
  Alert,
  Box,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AnimateButton from 'components/@extended/AnimateButton';
import { useDataFetch, useFormSubmit } from 'hooks/useBloodBank';
import { stokOpnameService } from 'services/bloodBank.service';
import { formatDateTime } from 'utils/dateUtils';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'no_opname', label: 'No. Stok Opname' },
  { id: 'tanggal', label: 'Tanggal' },
  { id: 'periode', label: 'Periode' },
  { id: 'petugas', label: 'Petugas' },
  { id: 'total_sistem', label: 'Total Sistem', align: 'center' },
  { id: 'total_fisik', label: 'Total Fisik', align: 'center' },
  { id: 'selisih', label: 'Selisih', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'actions', label: 'Aksi', align: 'center' }
];

const statusColor = {
  draft: 'warning',
  selesai: 'success'
};

export default function StokOpname() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    periode: '',
    petugas: '',
    keterangan: ''
  });

  const { data: stokOpnameList, loading, refetch } = useDataFetch(
    stokOpnameService.getAllStokOpname
  );

  const { submit: submitForm, loading: submitting } = useFormSubmit(
    stokOpnameService.createStokOpname,
    (result) => {
      handleCloseDialog();
      refetch();
      // Navigate to detail page
      navigate(`/stokopname/detail/${result.id}`);
    }
  );

  const handleOpenDialog = () => {
    const currentMonth = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    setFormData({
      periode: currentMonth,
      petugas: '',
      keterangan: 'Stok Opname Rutin'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    await submitForm(formData, 'Stok opname berhasil dibuat');
  };

  const handleViewDetail = (id) => {
    navigate(`/stokopname/detail/${id}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Stok Opname Darah"
          secondary={
            <AnimateButton>
              <Button
                variant="contained"
                startIcon={<PlusOutlined />}
                onClick={handleOpenDialog}
              >
                Buat Stok Opname
              </Button>
            </AnimateButton>
          }
        >
          <Alert severity="info" sx={{ mb: 2 }}>
            Stok opname adalah proses pencocokan antara stok darah di sistem dengan kondisi fisik di lemari pendingin.
          </Alert>

          <DataTable loading={loading}>
            <TableHead columns={columns} />
            <TableBody>
              {stokOpnameList?.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Chip label={row.no_opname} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{formatDateTime(row.tanggal)}</TableCell>
                  <TableCell>{row.periode}</TableCell>
                  <TableCell>{row.petugas}</TableCell>
                  <TableCell align="center">
                    <Chip label={row.total_sistem} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={row.total_fisik} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.selisih}
                      color={row.selisih === 0 ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.status.toUpperCase()} 
                      color={statusColor[row.status]}
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EyeOutlined />}
                      onClick={() => handleViewDetail(row.id)}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </MainCard>
      </Grid>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Buat Stok Opname Baru</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="info">
              Sistem akan otomatis membuat daftar semua darah yang berstatus "tersedia" untuk dilakukan pengecekan fisik.
            </Alert>

            <TextField
              label="Periode"
              fullWidth
              value={formData.periode}
              onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
              placeholder="Contoh: Januari 2026"
              required
            />

            <TextField
              label="Nama Petugas"
              fullWidth
              value={formData.petugas}
              onChange={(e) => setFormData({ ...formData, petugas: e.target.value })}
              required
            />

            <TextField
              label="Keterangan"
              fullWidth
              multiline
              rows={2}
              value={formData.keterangan}
              onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <AnimateButton>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Membuat...' : 'Buat Stok Opname'}
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
