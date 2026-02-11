import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Stack,
  Chip,
  Alert,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Paper,
  Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AnimateButton from 'components/@extended/AnimateButton';
import { stokOpnameService } from 'services/bloodBank.service';
import { formatDate, formatDateTime } from 'utils/dateUtils';
import { showSuccess, handleApiError } from 'utils/errorHandler';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

const columns = [
  { id: 'no', label: 'No.' },
  { id: 'no_kantong', label: 'No. Kantong' },
  { id: 'status_sistem', label: 'Status Sistem', align: 'center' },
  { id: 'status_fisik', label: 'Status Fisik', align: 'center' },
  { id: 'keterangan', label: 'Keterangan' }
];

export default function StokOpnameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stokOpname, setStokOpname] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await stokOpnameService.getStokOpnameById(parseInt(id));
      if (result.success) {
        setStokOpname(result.data);
        setDetails(result.data.details || []);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (darahId, statusFisik) => {
    try {
      await stokOpnameService.updateStokOpnameDetail(parseInt(id), darahId, statusFisik);
      // Update local state
      setDetails(details.map(d => 
        d.darah_id === darahId ? { ...d, status_fisik: statusFisik } : d
      ));
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleFinalize = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menyelesaikan stok opname ini? Data tidak dapat diubah setelah diselesaikan.')) {
      return;
    }

    const approvedBy = prompt('Masukkan nama pejabat yang menyetujui:');
    if (!approvedBy) return;

    try {
      setSaving(true);
      const result = await stokOpnameService.finalizeStokOpname(parseInt(id), approvedBy);
      if (result.success) {
        showSuccess('Stok opname berhasil diselesaikan');
        loadData();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  const totalFisik = details.filter(d => d.status_fisik === 'ada').length;
  const totalSelisih = (stokOpname?.total_sistem || 0) - totalFisik;
  const progress = stokOpname?.total_sistem > 0 
    ? Math.round((details.filter(d => d.status_fisik !== null).length / stokOpname.total_sistem) * 100)
    : 0;

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Button
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate('/stokopname')}
          sx={{ mb: 2 }}
        >
          Kembali
        </Button>

        <MainCard
          title={`Detail Stok Opname - ${stokOpname?.no_opname || ''}`}
          secondary={
            stokOpname?.status === 'draft' && (
              <AnimateButton>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleOutlined />}
                  onClick={handleFinalize}
                  disabled={saving || progress < 100}
                >
                  {saving ? 'Menyimpan...' : 'Selesaikan Stok Opname'}
                </Button>
              </AnimateButton>
            )
          }
        >
          {/* Header Info */}
          <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="textSecondary">Periode</Typography>
                <Typography variant="body1"><strong>{stokOpname?.periode}</strong></Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="textSecondary">Tanggal</Typography>
                <Typography variant="body1"><strong>{formatDateTime(stokOpname?.tanggal)}</strong></Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="textSecondary">Petugas</Typography>
                <Typography variant="body1"><strong>{stokOpname?.petugas}</strong></Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="textSecondary">Status</Typography>
                <Chip 
                  label={stokOpname?.status?.toUpperCase()} 
                  color={stokOpname?.status === 'selesai' ? 'success' : 'warning'}
                  size="small"
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Statistics */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                <Typography variant="h3" color="primary">{stokOpname?.total_sistem || 0}</Typography>
                <Typography variant="body2" color="textSecondary">Total Sistem</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                <Typography variant="h3" color="success.main">{totalFisik}</Typography>
                <Typography variant="body2" color="textSecondary">Total Fisik</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: totalSelisih === 0 ? '#e8f5e9' : '#ffebee' }}>
                <Typography variant="h3" color={totalSelisih === 0 ? 'success.main' : 'error.main'}>
                  {totalSelisih}
                </Typography>
                <Typography variant="body2" color="textSecondary">Selisih</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Progress */}
          {stokOpname?.status === 'draft' && (
            <Alert severity={progress === 100 ? 'success' : 'info'} sx={{ mb: 3 }}>
              Progress: {progress}% ({details.filter(d => d.status_fisik !== null).length} dari {stokOpname?.total_sistem})
              {progress === 100 && ' - Anda dapat menyelesaikan stok opname ini.'}
            </Alert>
          )}

          {/* Approval Info */}
          {stokOpname?.status === 'selesai' && (
            <Alert severity="success" sx={{ mb: 3 }}>
              <strong>Stok Opname Selesai</strong><br />
              Disetujui oleh: {stokOpname?.approved_by}<br />
              Waktu: {formatDateTime(stokOpname?.approved_at)}
            </Alert>
          )}

          {/* Table */}
          <DataTable loading={loading}>
            <TableHead columns={columns} />
            <TableBody>
              {details.map((row, index) => (
                <TableRow 
                  hover 
                  key={row.id}
                  sx={{
                    bgcolor: row.status_fisik === 'ada' 
                      ? '#f1f8e9' 
                      : row.status_fisik === 'tidak' 
                      ? '#ffebee' 
                      : 'inherit'
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Chip label={row.no_kantong} size="small" color="primary" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label="TERSEDIA" size="small" color="success" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    {stokOpname?.status === 'draft' ? (
                      <RadioGroup
                        row
                        value={row.status_fisik || ''}
                        onChange={(e) => handleStatusChange(row.darah_id, e.target.value)}
                      >
                        <FormControlLabel value="ada" control={<Radio />} label="Ada" />
                        <FormControlLabel value="tidak" control={<Radio />} label="Tidak Ada" />
                      </RadioGroup>
                    ) : (
                      <Chip 
                        label={row.status_fisik === 'ada' ? 'ADA' : 'TIDAK ADA'}
                        size="small"
                        color={row.status_fisik === 'ada' ? 'success' : 'error'}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {row.status_fisik !== 'ada' && row.status_fisik !== null && (
                      <Typography variant="caption" color="error">
                        ⚠️ Selisih - Kantong tidak ditemukan
                      </Typography>
                    )}
                    {row.status_fisik === 'ada' && (
                      <Typography variant="caption" color="success.main">
                        ✓ Sesuai
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </MainCard>
      </Grid>
    </Grid>
  );
}
