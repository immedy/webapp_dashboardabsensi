import { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

const klasifikasiData = [
  { id: 'manajemen', label: 'Manajemen' },
  { id: 'poli', label: 'Manajemen Poliklinik' },
  { id: 'admin-ruangan', label: 'Admin Ruangan' },
  { id: 'laundry', label: 'Jadwas Dinas 2 Shift Laundry' },
  { id: 'dapur', label: 'Jadwas Dinas 2 Shift Dapur' },
  { id: 'pramusaji', label: 'Jadwas Dinas 2 Shift Pramusaji' },
  { id: 'paramedis', label: 'Jadwal Dinas 3 Shift' },
  { id: 'admin-igd', label: 'Jadwas Dinas 2 Shift Admin IGD' },
  { id: 'apoteker', label: 'Jadwal Dinas Apoteker' },
  { id: 'asisten-apoteker', label: 'Jadwal Dinas Asisten Apoteker' }
];

const detailJamKerja = [
  { id: 1, namaJam: 'Manajemen', klasifikasiId: 'manajemen', klasifikasi: 'Manajemen', masuk: '08:00:00', pulang: '16:30:00' },
  { id: 2, namaJam: 'Poliklinik', klasifikasiId: 'poli', klasifikasi: 'Manajemen Poliklinik', masuk: '07:30:00', pulang: '16:00:00' },
  { id: 3, namaJam: 'Admin Ruangan', klasifikasiId: 'admin-ruangan', klasifikasi: 'Admin Ruangan', masuk: '08:00:00', pulang: '15:00:00' },
  {
    id: 4,
    namaJam: 'Laundry_Pagi',
    klasifikasiId: 'laundry',
    klasifikasi: 'Jadwas Dinas 2 Shift Laundry',
    masuk: '07:30:00',
    pulang: '15:00:00'
  },
  {
    id: 5,
    namaJam: 'Laundry_Siang',
    klasifikasiId: 'laundry',
    klasifikasi: 'Jadwas Dinas 2 Shift Laundry',
    masuk: '10:30:00',
    pulang: '18:00:00'
  },
  {
    id: 6,
    namaJam: 'Dapur_Pagi',
    klasifikasiId: 'dapur',
    klasifikasi: 'Jadwas Dinas 2 Shift Dapur',
    masuk: '05:00:00',
    pulang: '12:00:00'
  },
  {
    id: 7,
    namaJam: 'Dapur_Siang',
    klasifikasiId: 'dapur',
    klasifikasi: 'Jadwas Dinas 2 Shift Dapur',
    masuk: '12:00:00',
    pulang: '19:00:00'
  },
  {
    id: 8,
    namaJam: 'Pramusaji_Pagi',
    klasifikasiId: 'pramusaji',
    klasifikasi: 'Jadwas Dinas 2 Shift Pramusaji',
    masuk: '06:00:00',
    pulang: '13:00:00'
  },
  {
    id: 9,
    namaJam: 'Pramusaji_Siang',
    klasifikasiId: 'pramusaji',
    klasifikasi: 'Jadwas Dinas 2 Shift Pramusaji',
    masuk: '13:00:00',
    pulang: '20:00:00'
  },
  {
    id: 10,
    namaJam: 'Paramedis_Pagi',
    klasifikasiId: 'paramedis',
    klasifikasi: 'Jadwal Dinas 3 Shift',
    masuk: '07:30:00',
    pulang: '14:30:00'
  },
  {
    id: 11,
    namaJam: 'Paramedis_Siang',
    klasifikasiId: 'paramedis',
    klasifikasi: 'Jadwal Dinas 3 Shift',
    masuk: '14:30:00',
    pulang: '22:00:00'
  },
  {
    id: 12,
    namaJam: 'Paramedis_Malam',
    klasifikasiId: 'paramedis',
    klasifikasi: 'Jadwal Dinas 3 Shift',
    masuk: '21:30:00',
    pulang: '07:30:00'
  },
  {
    id: 13,
    namaJam: 'Admin_IGD_Pagi',
    klasifikasiId: 'admin-igd',
    klasifikasi: 'Jadwas Dinas 2 Shift Admin IGD',
    masuk: '08:00:00',
    pulang: '15:00:00'
  },
  {
    id: 14,
    namaJam: 'Admin_IGD_Siang',
    klasifikasiId: 'admin-igd',
    klasifikasi: 'Jadwas Dinas 2 Shift Admin IGD',
    masuk: '15:00:00',
    pulang: '22:00:00'
  },
  {
    id: 15,
    namaJam: 'Apoteker_Pagi',
    klasifikasiId: 'apoteker',
    klasifikasi: 'Jadwal Dinas Apoteker',
    masuk: '07:00:00',
    pulang: '14:00:00'
  },
  {
    id: 16,
    namaJam: 'Apoteker_Siang',
    klasifikasiId: 'apoteker',
    klasifikasi: 'Jadwal Dinas Apoteker',
    masuk: '13:00:00',
    pulang: '20:00:00'
  },
  {
    id: 17,
    namaJam: 'Asisten_Pagi',
    klasifikasiId: 'asisten-apoteker',
    klasifikasi: 'Jadwal Dinas Asisten Apoteker',
    masuk: '07:00:00',
    pulang: '14:00:00'
  },
  {
    id: 18,
    namaJam: 'Asisten_Siang',
    klasifikasiId: 'asisten-apoteker',
    klasifikasi: 'Jadwal Dinas Asisten Apoteker',
    masuk: '13:00:00',
    pulang: '20:00:00'
  }
];

const panelScrollSx = {
  maxHeight: { xs: 'none', lg: 'calc(100vh - 240px)' },
  overflowY: 'auto',
  pr: 1,
  '&::-webkit-scrollbar': { width: 8 },
  '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(144, 156, 181, 0.28)', borderRadius: 999 }
};

const defaultDetailForm = {
  deskripsi: '',
  jamMasuk: '',
  jamPulang: '',
  batasAwalMasuk: '',
  batasAkhirMasuk: '',
  batasAwalPulang: '',
  batasAkhirPulang: '',
  overnight: 'Tidak',
  jenisJadwal: ''
};

export default function DetailJamKerja() {
  const [selectedKlasifikasi, setSelectedKlasifikasi] = useState(klasifikasiData[0].id);
  const [openKlasifikasiModal, setOpenKlasifikasiModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [klasifikasiForm, setKlasifikasiForm] = useState({ deskripsi: '' });
  const [detailForm, setDetailForm] = useState(defaultDetailForm);

  const filteredDetail = useMemo(() => detailJamKerja.filter((item) => item.klasifikasiId === selectedKlasifikasi), [selectedKlasifikasi]);

  const handleOpenKlasifikasiModal = () => {
    setKlasifikasiForm({ deskripsi: '' });
    setOpenKlasifikasiModal(true);
  };

  const handleCloseKlasifikasiModal = () => {
    setOpenKlasifikasiModal(false);
  };

  const handleOpenDetailModal = () => {
    setDetailForm(defaultDetailForm);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const handleDetailChange = (field) => (event) => {
    setDetailForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <>
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 4 }}>
          <MainCard
            content={false}
            sx={{
              height: '100%',
              minHeight: 720,
              borderRadius: 4,
              borderColor: 'rgba(224, 229, 239, 0.9)',
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ px: 3, pt: 3, pb: 1.5 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                    Klasifikasi
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kelompok jam kerja yang tersedia
                  </Typography>
                </Box>
                <Tooltip title="Tambah Klasifikasi">
                  <AnimateButton>
                    <IconButton size="large" color="primary" sx={{ boxShadow: 3 }} onClick={handleOpenKlasifikasiModal}>
                      <PlusOutlined />
                    </IconButton>
                  </AnimateButton>
                </Tooltip>
              </Stack>
            </Box>

            <Box sx={{ px: 2, pb: 2, ...panelScrollSx }}>
              {klasifikasiData.map((item) => {
                const active = item.id === selectedKlasifikasi;

                return (
                  <Box
                    key={item.id}
                    onClick={() => setSelectedKlasifikasi(item.id)}
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      px: 2,
                      py: 2.25,
                      mb: 1.5,
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      bgcolor: active ? 'rgba(61, 211, 140, 0.08)' : 'transparent',
                      '&:hover': {
                        bgcolor: active ? 'rgba(61, 211, 140, 0.12)' : 'grey.50'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 14,
                        bottom: 14,
                        width: 5,
                        borderRadius: 999,
                        bgcolor: active ? '#3DD38C' : 'rgba(61, 211, 140, 0.3)'
                      }}
                    />

                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 36,
                        height: 36,
                        ml: 1.5,
                        bgcolor: active ? 'common.white' : 'grey.100',
                        color: 'text.secondary',
                        border: '1px solid',
                        borderColor: active ? 'rgba(61, 211, 140, 0.25)' : 'transparent'
                      }}
                    />

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: active ? 700 : 500,
                          color: active ? 'text.primary' : 'text.secondary',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </MainCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <MainCard
            content={false}
            sx={{
              height: '100%',
              minHeight: 720,
              borderRadius: 4,
              borderColor: 'rgba(224, 229, 239, 0.9)',
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ px: 3, pt: 3, pb: 1.5 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                    Detail
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jam masuk dan pulang untuk klasifikasi terpilih
                  </Typography>
                </Box>
                <Tooltip title="Tambah Detail Jam Kerja">
                  <AnimateButton>
                    <IconButton size="large" color="primary" sx={{ boxShadow: 3 }} onClick={handleOpenDetailModal}>
                      <PlusOutlined />
                    </IconButton>
                  </AnimateButton>
                </Tooltip>
              </Stack>
            </Box>

            <TableContainer sx={{ px: 2, pb: 2, ...panelScrollSx }}>
              <Table sx={{ minWidth: 760, borderCollapse: 'separate', borderSpacing: 0 }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        py: 2,
                        px: 1,
                        width: 56,
                        borderBottom: '1px dashed',
                        borderColor: 'divider'
                      }}
                    >
                      <Avatar variant="rounded" sx={{ width: 30, height: 30, bgcolor: 'grey.100' }} />
                    </TableCell>
                    <TableCell sx={{ py: 2, borderBottom: '1px dashed', borderColor: 'divider' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                        Nama Jam
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, borderBottom: '1px dashed', borderColor: 'divider' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                        Masuk
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, borderBottom: '1px dashed', borderColor: 'divider' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                        Pulang
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2, borderBottom: '1px dashed', borderColor: 'divider' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredDetail.map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{
                        '& td': {
                          borderBottom: '1px dashed',
                          borderColor: 'divider'
                        }
                      }}
                    >
                      <TableCell sx={{ py: 2.5, px: 1 }}>
                        <Avatar variant="rounded" sx={{ width: 30, height: 30, bgcolor: 'grey.100' }} />
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.35 }}>
                          {row.namaJam}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {row.klasifikasi}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {row.masuk}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {row.pulang}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                          <Tooltip title="Edit">
                            <IconButton size="large" color="primary">
                              <EditOutlined />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus">
                            <IconButton size="large" color="error">
                              <DeleteOutlined />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
      </Grid>

      <Dialog
        open={openKlasifikasiModal}
        onClose={handleCloseKlasifikasiModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            maxWidth: 600
          }
        }}
      >
        <DialogTitle>Tambah Klasifikasi</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Deskripsi"
              placeholder="Deskripsi"
              value={klasifikasiForm.deskripsi}
              onChange={(event) => setKlasifikasiForm({ deskripsi: event.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseKlasifikasiModal}>Batal</Button>
          <AnimateButton>
            <Button variant="contained">Simpan</Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDetailModal}
        onClose={handleCloseDetailModal}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: '100%'
          }
        }}
      >
        <DialogTitle>Tambah Waktu Absen</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Deskripsi"
                  placeholder="Deskripsi"
                  value={detailForm.deskripsi}
                  onChange={handleDetailChange('deskripsi')}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="time"
                  label="Jam Masuk"
                  value={detailForm.jamMasuk}
                  onChange={handleDetailChange('jamMasuk')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="time"
                  label="Jam Pulang"
                  value={detailForm.jamPulang}
                  onChange={handleDetailChange('jamPulang')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="time"
                  label="Batas Awal Jam Masuk"
                  value={detailForm.batasAwalMasuk}
                  onChange={handleDetailChange('batasAwalMasuk')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="time"
                  label="Batas Akhir Jam Masuk"
                  value={detailForm.batasAkhirMasuk}
                  onChange={handleDetailChange('batasAkhirMasuk')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="time"
                  label="Batas Awal Jam Pulang"
                  value={detailForm.batasAwalPulang}
                  onChange={handleDetailChange('batasAwalPulang')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="time"
                  label="Batas Akhir Jam Pulang"
                  value={detailForm.batasAkhirPulang}
                  onChange={handleDetailChange('batasAkhirPulang')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField select fullWidth label="Overnight" value={detailForm.overnight} onChange={handleDetailChange('overnight')}>
                  <MenuItem value="Tidak">Tidak</MenuItem>
                  <MenuItem value="Iya">Iya</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Deskripsi Jenis Jadwal"
                  value={detailForm.jenisJadwal}
                  onChange={handleDetailChange('jenisJadwal')}
                >
                  <MenuItem value="" disabled>
                    Pilih Jenis Jadwal
                  </MenuItem>
                  {klasifikasiData.map((item) => (
                    <MenuItem key={item.id} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal}>Batal</Button>
          <AnimateButton>
            <Button variant="contained">Simpan</Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
