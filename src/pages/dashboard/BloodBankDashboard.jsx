import { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  AlertTitle,
  Box,
  Stack
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { useDataFetch } from 'hooks/useBloodBank';
import { dashboardService } from 'services/bloodBank.service';
import { formatDate } from 'utils/dateUtils';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExportOutlined from '@ant-design/icons/ExportOutlined';

export default function BloodBankDashboard() {
  const { data: stats, loading } = useDataFetch(dashboardService.getStats);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const components = ['WB', 'PRC', 'TC', 'FFP', 'CRYO'];

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Header */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Dashboard Bank Darah</Typography>
      </Grid>

      {/* Statistics Cards */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce 
          title="Total Stok Tersedia" 
          count={stats?.totalStok || 0}
          extra={`${stats?.totalStok || 0} kantong`}
          color="success"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce 
          title="Expired Soon (≤3 hari)" 
          count={stats?.expiringSoon || 0}
          percentage={stats?.expiringSoon > 0 ? 100 : 0}
          isLoss
          color="warning"
          extra="Perlu perhatian!"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce 
          title="Total Expired" 
          count={stats?.totalExpired || 0}
          isLoss
          color="error"
          extra={`${stats?.totalExpired || 0} kantong`}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce 
          title="Total Distribusi" 
          count={stats?.totalDistributed || 0}
          color="info"
          extra="Darah keluar"
        />
      </Grid>

      {/* Expiring Soon Alert */}
      {stats?.expiringSoon > 0 && (
        <Grid size={12}>
          <Alert severity="warning" icon={<WarningOutlined />}>
            <AlertTitle>Perhatian! {stats.expiringSoon} kantong darah akan expired dalam 3 hari</AlertTitle>
            <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 300 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>No. Kantong</TableCell>
                    <TableCell>Golongan</TableCell>
                    <TableCell>Komponen</TableCell>
                    <TableCell>Tanggal Expired</TableCell>
                    <TableCell>Supplier</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.expiringSoonList?.map((blood) => (
                    <TableRow key={blood.id}>
                      <TableCell>
                        <Chip label={blood.no_kantong} size="small" color="warning" />
                      </TableCell>
                      <TableCell>{blood.golongan}{blood.rhesus}</TableCell>
                      <TableCell>{blood.komponen}</TableCell>
                      <TableCell>{formatDate(blood.tanggal_expired)}</TableCell>
                      <TableCell>{blood.supplier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Alert>
        </Grid>
      )}

      {/* Blood Stock Table */}
      <Grid size={12}>
        <MainCard title="Stok Darah Per Golongan & Komponen">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Golongan Darah</strong>
                  </TableCell>
                  {components.map((comp) => (
                    <TableCell key={comp} align="center">
                      <strong>{comp}</strong>
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <strong>Total</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bloodTypes.map((type) => {
                  const [gol, rh] = type.includes('+') 
                    ? [type.replace('+', ''), '+'] 
                    : [type.replace('-', ''), '-'];
                  
                  const bloodTypeData = stats?.bloodByType?.[type];
                  let totalRow = 0;

                  return (
                    <TableRow key={type} hover>
                      <TableCell>
                        <Chip 
                          label={type} 
                          color="secondary" 
                          size="medium"
                          sx={{ minWidth: 60 }}
                        />
                      </TableCell>
                      {components.map((comp) => {
                        const count = bloodTypeData?.components?.[comp] || 0;
                        totalRow += count;
                        return (
                          <TableCell key={comp} align="center">
                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 40,
                                height: 32,
                                borderRadius: 1,
                                bgcolor: count === 0 ? '#ffebee' : count < 3 ? '#fff3e0' : '#e8f5e9',
                                color: count === 0 ? '#c62828' : count < 3 ? '#ef6c00' : '#2e7d32',
                                fontWeight: 'bold'
                              }}
                            >
                              {count}
                            </Box>
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <Chip 
                          label={totalRow}
                          color={totalRow === 0 ? 'error' : totalRow < 5 ? 'warning' : 'success'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 20, height: 20, bgcolor: '#e8f5e9', borderRadius: 1 }} />
              <Typography variant="caption">Stok Aman (≥3)</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 20, height: 20, bgcolor: '#fff3e0', borderRadius: 1 }} />
              <Typography variant="caption">Stok Menipis (&lt;3)</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 20, height: 20, bgcolor: '#ffebee', borderRadius: 1 }} />
              <Typography variant="caption">Stok Kosong (0)</Typography>
            </Stack>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}
