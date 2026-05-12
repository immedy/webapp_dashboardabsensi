import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate, useParams } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import ActionCell from 'components/tablesearch/ActionCell';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import FormOutlined from '@ant-design/icons/FormOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { defaultPresensiForm, initialPresensiLogs, pegawaiData } from 'pages/absensi/input-telat/data';

dayjs.locale('id');

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'status', label: 'Status Absen' },
  { id: 'tanggalJam', label: 'Tanggal Jam' },
  { id: 'keterangan', label: 'Keterangan' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

function formatTanggalJam(tanggal, jam) {
  return dayjs(`${tanggal} ${jam}`, 'YYYY-MM-DD HH:mm').locale('id').format('dddd, DD MMMM YYYY HH:mm');
}

function getStatusChip(status) {
  if (status === 'Masuk') {
    return {
      color: 'success',
      variant: 'filled',
      sx: {
        bgcolor: 'success.lighter',
        color: 'success.main',
        fontWeight: 600
      }
    };
  }

  return {
    color: 'info',
    variant: 'filled',
    sx: {
      bgcolor: 'info.lighter',
      color: 'info.main',
      fontWeight: 600
    }
  };
}

export default function InputLogPegawai() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultPresensiForm);
  const [editingId, setEditingId] = useState(null);
  const [logData, setLogData] = useState(initialPresensiLogs);

  const pegawai = pegawaiData.find((item) => String(item.id) === String(id)) || pegawaiData[0];

  const pegawaiLogs = useMemo(() => {
    return logData
      .filter((item) => item.pegawaiId === pegawai.id)
      .sort((a, b) => dayjs(`${b.tanggal} ${b.jam}`).valueOf() - dayjs(`${a.tanggal} ${a.jam}`).valueOf());
  }, [logData, pegawai.id]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setEditingId(null);
    setFormData(defaultPresensiForm);
  };

  const handleOpenCreateDialog = () => {
    setEditMode(false);
    setEditingId(null);
    setFormData(defaultPresensiForm);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (row) => {
    setEditMode(true);
    setEditingId(row.id);
    setFormData({
      status: row.status,
      tanggal: row.tanggal,
      jam: row.jam,
      keterangan: row.keterangan
    });
    setOpenDialog(true);
  };

  const handleChangeForm = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleChangeTanggal = (dates) => {
    const selectedDate = dates?.[0];
    setFormData((prev) => ({
      ...prev,
      tanggal: selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : ''
    }));
  };

  const handleChangeJam = (dates) => {
    const selectedTime = dates?.[0];
    setFormData((prev) => ({
      ...prev,
      jam: selectedTime ? dayjs(selectedTime).format('HH:mm') : ''
    }));
  };

  const handleSubmit = () => {
    if (!formData.tanggal || !formData.jam) return;

    if (editMode && editingId) {
      setLogData((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                status: formData.status,
                tanggal: formData.tanggal,
                jam: formData.jam,
                keterangan: formData.keterangan
              }
            : item
        )
      );
    } else {
      setLogData((prev) => [
        {
          id: Date.now(),
          pegawaiId: pegawai.id,
          status: formData.status,
          tanggal: formData.tanggal,
          jam: formData.jam,
          keterangan: formData.keterangan
        },
        ...prev
      ]);
    }

    handleCloseDialog();
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}>
          <MainCard
            title={pegawai.nama}
            secondary={
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title="Tambah Presensi">
                  <AnimateButton>
                    <IconButton size="large" color="primary" sx={{ boxShadow: 3 }} onClick={handleOpenCreateDialog}>
                      <PlusOutlined />
                    </IconButton>
                  </AnimateButton>
                </Tooltip>
              </Stack>
            }
          >
            <DataTable>
              <TableHead columns={columns} />
              <TableBody>
                {pegawaiLogs.map((row, index) => {
                  const statusChip = getStatusChip(row.status);

                  return (
                    <TableRow hover key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Chip label={row.status} size="small" sx={statusChip.sx} />
                      </TableCell>
                      <TableCell>{formatTanggalJam(row.tanggal, row.jam)}</TableCell>
                      <TableCell>
                        <Typography variant="body2" color={row.keterangan ? 'text.primary' : 'text.secondary'}>
                          {row.keterangan || '-'}
                        </Typography>
                      </TableCell>
                      <ActionCell align="center">
                        <Tooltip title="Edit Presensi">
                          <IconButton size="large" color="success" onClick={() => handleOpenEditDialog(row)}>
                            <FormOutlined />
                          </IconButton>
                        </Tooltip>
                      </ActionCell>
                    </TableRow>
                  );
                })}

                {pegawaiLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        Belum ada log presensi untuk pegawai ini.
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Presensi' : 'Input Presensi'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {!editMode && (
              <TextField select label="Jenis Absensi" fullWidth value={formData.status} onChange={handleChangeForm('status')}>
                <MenuItem value="Masuk">Absen Masuk</MenuItem>
                <MenuItem value="Pulang">Absen Pulang</MenuItem>
              </TextField>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Flatpickr
                  value={formData.tanggal}
                  options={{ dateFormat: 'Y-m-d' }}
                  onChange={handleChangeTanggal}
                  render={({ defaultValue }, ref) => (
                    <TextField
                      inputRef={ref}
                      defaultValue={defaultValue}
                      label="Tanggal Presensi"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: <CalendarOutlined style={{ color: '#8c8c8c' }} />
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Flatpickr
                  value={formData.jam ? `2000-01-01 ${formData.jam}` : ''}
                  options={{ enableTime: true, noCalendar: true, dateFormat: 'H:i', time_24hr: true }}
                  onChange={handleChangeJam}
                  render={({ defaultValue }, ref) => (
                    <TextField
                      inputRef={ref}
                      defaultValue={defaultValue}
                      label="Jam Presensi"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      placeholder="Pilih jam"
                    />
                  )}
                />
              </Box>
            </Stack>

            <TextField
              label="Alasan Tidak Absen"
              fullWidth
              multiline
              rows={4}
              value={formData.keterangan}
              onChange={handleChangeForm('keterangan')}
              placeholder="Tulis alasan"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <AnimateButton>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
