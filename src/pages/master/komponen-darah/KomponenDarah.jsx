import {
  Box,
  Button,
  Pagination,
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
import TableSearch from 'components/tablesearch/TableSearch';
import TableHead from 'components/tablesearch/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ActionCell from 'components/tablesearch/ActionCell';
import AnimateButton from 'components/@extended/AnimateButton';

import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import useKomponenDarah from './useKomponenDarah';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'kode', label: 'Kode' },
  { id: 'deskripsi', label: 'Deskripsi Komponen' },
  { id: 'keterangan', label: 'Keterangan' },
  { id: 'masa_simpan', label: 'Masa Simpan (Hari)', align: 'center' },
  { id: 'actions', label: 'Aksi', align: 'right' }
];

export default function KomponenDarah() {
  const {
    openDialog,
    editMode,
    formData,
    search,
    pagination,
    komponenList,
    loading,
    submitting,
    deleting,
    handleOpenDialog,
    handleCloseDialog,
    handleChangeForm,
    handleSubmit,
    handleDelete,
    handleSearchChange,
    handlePageChange
  } = useKomponenDarah();

  const startIndex = (pagination.currentPage - 1) * pagination.perPage;

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Master Komponen Darah"
          secondary={
            <Tooltip title="Tambah Komponen Darah">
              <IconButton size="large" color="primary" sx={{ boxShadow: 3 }} onClick={() => handleOpenDialog()}>
                <PlusOutlined />
              </IconButton>
            </Tooltip>
          }>
          <Box sx={{ mb: 2 }}>
            <TableSearch value={search} onChange={handleSearchChange} placeholder="Cari kode/deskripsi komponen..." />
          </Box>

          <DataTable loading={loading}>
            <TableHead columns={columns} />
            <TableBody>
              {komponenList?.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>
                    <Chip label={row.kode} color="success" size="small" />
                  </TableCell>
                  <TableCell>{row.deskripsi}</TableCell>
                  <TableCell>{row.keterangan}</TableCell>
                  <TableCell align="center">
                    <Chip label={`${row.masa_simpan} hari`} size="small" variant="outlined" />
                  </TableCell>
                  <ActionCell>
                    <Tooltip title="Edit">
                      <IconButton size="large" color="primary" onClick={() => handleOpenDialog(row)}>
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="large" color="error" onClick={() => handleDelete(row.id, row.deskripsi)} disabled={deleting}>
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </ActionCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Box sx={{ fontSize: 12, color: 'text.secondary' }}>Total data: {pagination.total}</Box>
            <Pagination
              color="primary"
              page={pagination.currentPage}
              count={pagination.lastPage}
              onChange={handlePageChange}
              disabled={loading}
            />
          </Stack>
        </MainCard>
      </Grid>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Komponen Darah' : 'Tambah Komponen Darah'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Kode" fullWidth value={formData.kode} onChange={handleChangeForm('kode')} required />
            <TextField label="Deskripsi Komponen" fullWidth value={formData.deskripsi} onChange={handleChangeForm('deskripsi')} required />
            <TextField
              label="Keterangan"
              fullWidth
              multiline
              rows={3}
              value={formData.keterangan}
              onChange={handleChangeForm('keterangan')}
            />
            <TextField
              label="Masa Simpan (Hari)"
              fullWidth
              type="number"
              value={formData.masa_simpan}
              onChange={handleChangeForm('masa_simpan')}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <AnimateButton>
            <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
