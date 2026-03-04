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
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AnimateButton from 'components/@extended/AnimateButton';
import InputAutoComplete from 'components/input/InputAutoComplete';
import { useDataFetch, useFormSubmit } from 'hooks/useBloodBank';
import { bloodInventoryService, masterDataService } from 'services/bloodBank.service';
import { formatDate, getDaysUntilExpiry, addDays, getTodayDate } from 'utils/dateUtils';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'no_kantong', label: 'No. Kantong' },
  { id: 'golongan', label: 'Gol. Darah' },
  { id: 'komponen', label: 'Komponen' },
  { id: 'volume', label: 'Volume (ml)', align: 'center' },
  { id: 'supplier', label: 'Supplier/PMI' },
  { id: 'tanggal_terima', label: 'Tgl Terima' },
  { id: 'tanggal_expired', label: 'Tgl Expired' },
  { id: 'sisa_hari', label: 'Sisa Hari', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' }
];

const statusColor = {
  tersedia: 'success',
  keluar: 'info',
  expired: 'error',
  rusak: 'warning'
};

export default function DarahMasuk() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    no_kantong: '',
    golongan_id: '',
    rhesus_id: '',
    komponen_id: '',
    supplier_id: '',
    volume: 350,
    tanggal_terima: getTodayDate(),
    tanggal_expired: '',
    keterangan: ''
  });

  const { data: bloodList, loading, refetch } = useDataFetch(
    bloodInventoryService.getAllBlood
  );

  const { data: golonganList } = useDataFetch(masterDataService.getGolonganDarah);
  const { data: rhesusData } = useDataFetch(masterDataService.getRhesus);
  const { data: komponenList } = useDataFetch(masterDataService.getKomponenDarah);
  const { data: supplierList } = useDataFetch(masterDataService.getSupplier);

  const { submit: submitForm, loading: submitting } = useFormSubmit(
    bloodInventoryService.createBlood,
    () => {
      handleCloseDialog();
      refetch();
    }
  );

  const handleOpenDialog = () => {
    setFormData({
      no_kantong: '',
      golongan_id: '',
      rhesus_id: '',
      komponen_id: '',
      supplier_id: '',
      volume: 350,
      tanggal_terima: getTodayDate(),
      tanggal_expired: '',
      keterangan: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleKomponenChange = (komponenId) => {
    const komponen = komponenList?.find(k => k.id === komponenId);
    const tanggalExpired = komponen
      ? addDays(formData.tanggal_terima, komponen.masa_simpan)
      : '';

    setFormData({
      ...formData,
      komponen_id: komponenId,
      tanggal_expired: tanggalExpired
    });
  };

  const handleSubmit = async () => {
    const golongan = golonganList?.find(g => g.id === formData.golongan_id);
    const rhesus = rhesusData?.find(r => r.id === formData.rhesus_id);
    const komponen = komponenList?.find(k => k.id === formData.komponen_id);
    const supplier = supplierList?.find(s => s.id === formData.supplier_id);

    const submitData = {
      ...formData,
      golongan: golongan?.nama,
      rhesus: rhesus?.kode,
      komponen: komponen?.nama,
      komponen_kode: komponen?.kode,
      supplier: supplier?.nama
    };

    await submitForm(submitData, 'Data darah masuk berhasil ditambahkan');
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Transaksi Darah Masuk"
          secondary={
            <AnimateButton>
              <Button
                variant="contained"
                startIcon={<PlusOutlined />}
                onClick={handleOpenDialog}
              >
                Input Darah Masuk
              </Button>
            </AnimateButton>
          }
        >
          <DataTable loading={loading}>
            <TableHead columns={columns} />
            <TableBody>
              {bloodList?.map((row, index) => {
                const sisaHari = getDaysUntilExpiry(row.tanggal_expired);
                return (
                  <TableRow hover key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Chip label={row.no_kantong} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${row.golongan}${row.rhesus}`}
                        color="secondary"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.komponen}</TableCell>
                    <TableCell align="center">{row.volume} ml</TableCell>
                    <TableCell>{row.supplier}</TableCell>
                    <TableCell>{formatDate(row.tanggal_terima)}</TableCell>
                    <TableCell>{formatDate(row.tanggal_expired)}</TableCell>
                    <TableCell align="center">
                      {sisaHari !== null && (
                        <Chip
                          label={`${sisaHari} hari`}
                          color={sisaHari <= 3 ? 'error' : sisaHari <= 7 ? 'warning' : 'default'}
                          size="small"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.status}
                        color={statusColor[row.status]}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </DataTable>
        </MainCard>
      </Grid>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Input Darah Masuk</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="info">
              Pastikan data yang diinput sudah benar. Nomor kantong harus unik!
            </Alert>

            <TextField
              label="Nomor Kantong"
              fullWidth
              value={formData.no_kantong}
              onChange={(e) => setFormData({ ...formData, no_kantong: e.target.value })}
              placeholder="Contoh: BD000051"
              required
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputAutoComplete
                  label="Golongan Darah"
                  options={golonganList || []}
                  labelKey="nama"
                  value={golonganList?.find((item) => item.id === formData.golongan_id) || null}
                  onChange={(newValue) => setFormData({ ...formData, golongan_id: newValue?.id || '' })}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputAutoComplete
                  label="Rhesus"
                  options={rhesusData || []}
                  labelKey="nama"
                  value={rhesusData?.find((item) => item.id === formData.rhesus_id) || null}
                  onChange={(newValue) => setFormData({ ...formData, rhesus_id: newValue?.id || '' })}
                  required
                />
              </Grid>
            </Grid>

            <InputAutoComplete
              label="Komponen Darah"
              options={komponenList || []}
              value={komponenList?.find((item) => item.id === formData.komponen_id) || null}
              getOptionLabel={(option) => `${option.nama} (${option.kode}) - Masa Simpan: ${option.masa_simpan} hari`}
              onChange={(newValue) => handleKomponenChange(newValue?.id || '')}
              required
            />

            <InputAutoComplete
              label="Supplier/PMI"
              options={supplierList || []}
              labelKey="nama"
              value={supplierList?.find((item) => item.id === formData.supplier_id) || null}
              onChange={(newValue) => setFormData({ ...formData, supplier_id: newValue?.id || '' })}
              required
            />

            <TextField
              label="Volume (ml)"
              fullWidth
              type="number"
              value={formData.volume}
              onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              required
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Tanggal Terima"
                  fullWidth
                  type="date"
                  value={formData.tanggal_terima}
                  onChange={(e) => setFormData({ ...formData, tanggal_terima: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Tanggal Expired"
                  fullWidth
                  type="date"
                  value={formData.tanggal_expired}
                  onChange={(e) => setFormData({ ...formData, tanggal_expired: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  required
                  helperText="Otomatis terisi berdasarkan komponen"
                />
              </Grid>
            </Grid>

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
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
