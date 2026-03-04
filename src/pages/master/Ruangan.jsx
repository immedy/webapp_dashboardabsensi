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
import InputAutoComplete from 'components/input/InputAutoComplete';
import { useDataFetch, useFormSubmit, useDelete } from 'hooks/useBloodBank';
import { masterDataService } from 'services/bloodBank.service';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'kode', label: 'Kode' },
  { id: 'nama', label: 'Nama Ruangan' },
  { id: 'jenis', label: 'Jenis' },
  { id: 'kapasitas', label: 'Kapasitas', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'actions', label: 'Aksi', align: 'right' }
];

const jenisRuangan = ['IGD', 'Rawat Inap', 'ICU', 'Operasi', 'Hemodialisa', 'Lainnya'];

export default function Ruangan() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    kode: '',
    nama: '',
    jenis: '',
    kapasitas: '',
    status: 'aktif'
  });

  const { data: ruanganList, loading, refetch } = useDataFetch(
    masterDataService.getRuangan
  );

  const { submit: submitForm, loading: submitting } = useFormSubmit(
    (data) => editMode
      ? masterDataService.updateRuangan(formData.id, data)
      : masterDataService.createRuangan(data),
    () => {
      handleCloseDialog();
      refetch();
    }
  );

  const { deleteItem, loading: deleting } = useDelete(
    masterDataService.deleteRuangan,
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
        jenis: '',
        kapasitas: '',
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
    await deleteItem(id, `ruangan ${nama}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Master Ruangan"
          secondary={
            <AnimateButton>
              <Button
                variant="contained"
                startIcon={<PlusOutlined />}
                onClick={() => handleOpenDialog()}
              >
                Tambah Ruangan
              </Button>
            </AnimateButton>
          }
        >
          <DataTable loading={loading}>
            <TableHead columns={columns} />
            <TableBody>
              {ruanganList?.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Chip label={row.kode} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>
                    <Chip label={row.jenis} color="secondary" size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">{row.kapasitas}</TableCell>
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Ruangan' : 'Tambah Ruangan'}</DialogTitle>
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
              label="Nama Ruangan"
              fullWidth
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              required
            />
            <InputAutoComplete
              label="Jenis Ruangan"
              options={jenisRuangan}
              value={formData.jenis || null}
              onChange={(newValue) => setFormData({ ...formData, jenis: newValue || '' })}
              required
            />
            <TextField
              label="Kapasitas"
              fullWidth
              type="number"
              value={formData.kapasitas}
              onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
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
