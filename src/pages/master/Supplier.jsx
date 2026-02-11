import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Stack,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ActionCell from 'components/tablesearch/ActionCell';
import AnimateButton from 'components/@extended/AnimateButton';
import { useDataFetch, useFormSubmit, useDelete } from 'hooks/useBloodBank';
import { masterDataService } from 'services/bloodBank.service';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'kode', label: 'Kode' },
  { id: 'nama', label: 'Nama Supplier/PMI' },
  { id: 'alamat', label: 'Alamat' },
  { id: 'telepon', label: 'Telepon' },
  { id: 'email', label: 'Email' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'actions', label: 'Aksi', align: 'right' }
];

export default function Supplier() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    kode: '',
    nama: '',
    alamat: '',
    telepon: '',
    email: '',
    status: 'aktif'
  });

  const { data: supplierList, loading, refetch } = useDataFetch(
    masterDataService.getSupplier
  );

  const { submit: submitForm, loading: submitting } = useFormSubmit(
    (data) => editMode 
      ? masterDataService.updateSupplier(formData.id, data)
      : masterDataService.createSupplier(data),
    () => {
      handleCloseDialog();
      refetch();
    }
  );

  const { deleteItem, loading: deleting } = useDelete(
    masterDataService.deleteSupplier,
    refetch
  );

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditMode(true);
      setFormData(item);
    } else {
      setEditMode(false);
      setFormData({
        id: null,
        kode: '',
        nama: '',
        alamat: '',
        telepon: '',
        email: '',
        status: 'aktif'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    await submitForm(formData, editMode ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
  };

  const handleDelete = async (id, nama) => {
    await deleteItem(id, `supplier ${nama}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Master Supplier / PMI"
          secondary={
            <AnimateButton>
              <Button
                variant="contained"
                startIcon={<PlusOutlined />}
                onClick={() => handleOpenDialog()}
              >
                Tambah Supplier
              </Button>
            </AnimateButton>
          }
        >
          <DataTable loading={loading}>
            <TableHead columns={columns} />
            <TableBody>
              {supplierList?.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Chip label={row.kode} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.alamat}</TableCell>
                  <TableCell>{row.telepon}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.status} 
                      color={row.status === 'aktif' ? 'success' : 'default'}
                      size="small" 
                    />
                  </TableCell>
                  <ActionCell>
                    <Tooltip title="Edit">
                      <IconButton
                        size="large"
                        color="primary"
                        onClick={() => handleOpenDialog(row)}
                      >
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton
                        size="large"
                        color="error"
                        onClick={() => handleDelete(row.id, row.nama)}
                        disabled={deleting}
                      >
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

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Supplier/PMI' : 'Tambah Supplier/PMI'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Kode"
              fullWidth
              value={formData.kode}
              onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
              required
            />
            <TextField
              label="Nama Supplier/PMI"
              fullWidth
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              required
            />
            <TextField
              label="Alamat"
              fullWidth
              multiline
              rows={2}
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
            />
            <TextField
              label="Telepon"
              fullWidth
              value={formData.telepon}
              onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
