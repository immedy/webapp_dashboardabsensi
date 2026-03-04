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
import { bloodOutService, bloodInventoryService, masterDataService } from 'services/bloodBank.service';
import { formatDate } from 'utils/dateUtils';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'no_transaksi', label: 'No. Transaksi' },
  { id: 'tanggal', label: 'Tanggal' },
  { id: 'no_kantong', label: 'No. Kantong' },
  { id: 'golongan', label: 'Gol. Darah' },
  { id: 'komponen', label: 'Komponen' },
  { id: 'pasien', label: 'Pasien' },
  { id: 'ruangan', label: 'Ruangan' },
  { id: 'dokter', label: 'Dokter' },
  { id: 'petugas', label: 'Petugas' }
];

export default function DarahKeluar() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlood, setSelectedBlood] = useState(null);
  const [formData, setFormData] = useState({
    darah_id: '',
    pasien_nama: '',
    pasien_no_rm: '',
    ruangan_id: '',
    dokter: '',
    keterangan: '',
    petugas: ''
  });

  const { data: bloodOutList, loading, refetch } = useDataFetch(
    bloodOutService.getAllBloodOut
  );

  const { data: availableBlood } = useDataFetch(
    bloodInventoryService.getAvailableBlood
  );

  const { data: ruanganList } = useDataFetch(masterDataService.getRuangan);

  const { submit: submitForm, loading: submitting } = useFormSubmit(
    bloodOutService.createBloodOut,
    () => {
      handleCloseDialog();
      refetch();
    }
  );

  const handleOpenDialog = () => {
    setSelectedBlood(null);
    setFormData({
      darah_id: '',
      pasien_nama: '',
      pasien_no_rm: '',
      ruangan_id: '',
      dokter: '',
      keterangan: '',
      petugas: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleBloodSelect = (blood) => {
    setSelectedBlood(blood);
    if (blood) {
      setFormData({
        ...formData,
        darah_id: blood.id
      });
    }
  };

  const handleSubmit = async () => {
    const ruangan = ruanganList?.find(r => r.id === formData.ruangan_id);
    
    const submitData = {
      ...formData,
      no_kantong: selectedBlood?.no_kantong,
      golongan: selectedBlood?.golongan,
      rhesus: selectedBlood?.rhesus,
      komponen: selectedBlood?.komponen,
      ruangan: ruangan?.nama
    };

    await submitForm(submitData, 'Transaksi darah keluar berhasil disimpan');
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <MainCard
          title="Transaksi Darah Keluar"
          secondary={
            <AnimateButton>
              <Button
                variant="contained"
                startIcon={<PlusOutlined />}
                onClick={handleOpenDialog}
              >
                Distribusi Darah
              </Button>
            </AnimateButton>
          }
        >
          <DataTable loading={loading}>
            <TableHead columns={columns} />
            <TableBody>
              {bloodOutList?.map((row, index) => (
                <TableRow hover key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Chip label={row.no_transaksi} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{formatDate(row.tanggal)}</TableCell>
                  <TableCell>{row.no_kantong}</TableCell>
                  <TableCell>
                    <Chip 
                      label={`${row.golongan}${row.rhesus}`} 
                      color="secondary" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{row.komponen}</TableCell>
                  <TableCell>
                    {row.pasien_nama}
                    <br />
                    <small style={{ color: '#666' }}>RM: {row.pasien_no_rm}</small>
                  </TableCell>
                  <TableCell>{row.ruangan}</TableCell>
                  <TableCell>{row.dokter}</TableCell>
                  <TableCell>{row.petugas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </MainCard>
      </Grid>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Distribusi Darah Keluar</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="warning">
              Pastikan data pasien dan permintaan darah sudah sesuai!
            </Alert>

            <InputAutoComplete
              label="Pilih Kantong Darah"
              required
              options={availableBlood || []}
              getOptionLabel={(option) => 
                `${option.no_kantong} - ${option.golongan}${option.rhesus} - ${option.komponen}`
              }
              value={selectedBlood}
              onChange={handleBloodSelect}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Stack spacing={0.5}>
                      <div>
                        <strong>{option.no_kantong}</strong> - {option.golongan}{option.rhesus}
                      </div>
                      <small style={{ color: '#666' }}>
                        {option.komponen} - Expired: {formatDate(option.tanggal_expired)}
                      </small>
                    </Stack>
                  </li>
                );
              }}
            />

            {selectedBlood && (
              <Alert severity="info">
                <strong>Detail Darah Terpilih:</strong><br />
                Golongan: {selectedBlood.golongan}{selectedBlood.rhesus}<br />
                Komponen: {selectedBlood.komponen}<br />
                Volume: {selectedBlood.volume} ml<br />
                Expired: {formatDate(selectedBlood.tanggal_expired)}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Nama Pasien"
                  fullWidth
                  value={formData.pasien_nama}
                  onChange={(e) => setFormData({ ...formData, pasien_nama: e.target.value })}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="No. Rekam Medis"
                  fullWidth
                  value={formData.pasien_no_rm}
                  onChange={(e) => setFormData({ ...formData, pasien_no_rm: e.target.value })}
                  placeholder="Contoh: RM-001234"
                  required
                />
              </Grid>
            </Grid>

            <InputAutoComplete
              label="Ruangan"
              options={ruanganList || []}
              value={ruanganList?.find((item) => item.id === formData.ruangan_id) || null}
              getOptionLabel={(option) => `${option.nama} - ${option.jenis}`}
              onChange={(newValue) => setFormData({ ...formData, ruangan_id: newValue?.id || '' })}
              required
            />

            <TextField
              label="Nama Dokter"
              fullWidth
              value={formData.dokter}
              onChange={(e) => setFormData({ ...formData, dokter: e.target.value })}
              placeholder="Contoh: Dr. Budi Santoso, Sp.PD"
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
              placeholder="Contoh: Pasien anemia berat post operasi"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <AnimateButton>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting || !selectedBlood}
            >
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

