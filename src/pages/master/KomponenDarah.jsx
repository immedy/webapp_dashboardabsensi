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
  { id: 'nama', label: 'Nama Komponen' },
  { id: 'keterangan', label: 'Keterangan' },
  { id: 'masa_simpan', label: 'Masa Simpan (Hari)', align: 'center' },
  { id: 'actions', label: 'Aksi', align: 'right' }
];

export default function KomponenDarah() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    kode: '',
    nama: '',
    keterangan: '',
    masa_simpan: ''
  });

  const { data: komponenList, loading, refetch } = useDataFetch(
    masterDataService.getKomponenDarah
  );

  const { submit: submitForm, loading: submitting } = useFormSubmit(
    (data) => editMode 
      ? masterDataService.updateKomponenDarah(formData.id, data)
      : masterDataService.createKomponenDarah(data),
    () => {
      handleCloseDialog();
      refetch();
    }
  );

  const { deleteItem, loading: deleting } = useDelete(
    masterDataService.deleteKomponenDarah,
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
        keterangan: '',
        masa_simpan: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      id: null,
      kode: '',
      nama: '',
      keterangan: '',
      masa_simpan: ''
    });
  };

  const handleSubmit = async () => {
    await submitForm(formData, editMode ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
  };

  const handleDelete = async (id, nama) => {
    await deleteItem(id, `komponen ${nama}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Master Komponen Darah"
          secondary={
            <AnimateButton>
              <Button
                variant="contained"
                startIcon={<PlusOutlined />}
                onClick={() => handleOpenDialog()}
              >
                Tambah Komponen
              </Button>
            </AnimateButton>
          }
        >
          <DataTable loading={loading}>
            <TableHead columns={columns} />
            <TableBody>
              {komponenList?.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Chip label={row.kode} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.keterangan}</TableCell>
                  <TableCell align="center">
                    <Chip label={`${row.masa_simpan} hari`} size="small" variant="outlined" />
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Komponen Darah' : 'Tambah Komponen Darah'}</DialogTitle>
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
              label="Nama Komponen"
              fullWidth
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              required
            />
            <TextField
              label="Keterangan"
              fullWidth
              multiline
              rows={3}
              value={formData.keterangan}
              onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
            />
            <TextField
              label="Masa Simpan (Hari)"
              fullWidth
              type="number"
              value={formData.masa_simpan}
              onChange={(e) => setFormData({ ...formData, masa_simpan: e.target.value })}
              required
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
