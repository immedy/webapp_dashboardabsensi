import { useMemo, useRef, useState } from 'react';
import { Box, ButtonBase, Divider, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import MainCard from 'components/MainCard';
import InputAutoComplete from 'components/input/InputAutoComplete';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';

dayjs.locale('id');

const ruanganOptions = [
  'Tim Kerja Sistem Informasi Manajemen Rumah Sakit',
  'Bagian Umum dan Kepegawaian',
  'Bidang Pelayanan Medis',
  'Depo Farmasi Rawat Jalan',
  'Depo Farmasi Kamar Operasi'
];

const pegawaiOptions = [
  'Rahmat Sholeh',
  'Muzi Burrakhman',
  'Ragil M. Rivandi',
  'Muhammad Zaki Kurniawan',
  'Wahyudi Muslim'
];

const laporanCards = [
  { id: 'absensi', title: 'Absensi' },
  { id: 'rekap-absensi', title: 'Rekap Absensi' },
  { id: 'ac-logs', title: 'AC Logs' },
  { id: 'rekap-ac-logs', title: 'Rekap AC Logs' }
];

function formatTanggalLabel(value) {
  if (!value || value.length !== 2 || !value[0] || !value[1]) return '';
  return `${dayjs(value[0]).locale('id').format('DD MMMM YYYY')} - ${dayjs(value[1]).locale('id').format('DD MMMM YYYY')}`;
}

export default function Laporan() {
  const datePickerRef = useRef(null);
  const [selectedRuangan, setSelectedRuangan] = useState(null);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const tanggalLabel = useMemo(() => formatTanggalLabel(selectedDateRange), [selectedDateRange]);

  const handleTanggalChange = (dates) => {
    setSelectedDateRange(dates || []);

    if (dates.length === 1) {
      window.setTimeout(() => {
        datePickerRef.current?.flatpickr?.open();
      }, 0);
    }
  };

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, lg: 4 }}>
        <MainCard
          title="Filter Laporan"
          sx={{
            height: '100%',
            minHeight: 620
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 700 }}>
                Ruangan
              </Typography>
              <InputAutoComplete
                label="Pilih Ruangan"
                options={ruanganOptions}
                value={selectedRuangan}
                onChange={setSelectedRuangan}
                placeholder="Cari ruangan"
              />
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box>
              <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 700 }}>
                Nama Pegawai
              </Typography>
              <InputAutoComplete
                label="Pilih Pegawai"
                options={pegawaiOptions}
                value={selectedPegawai}
                onChange={setSelectedPegawai}
                placeholder="Cari pegawai"
              />
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box>
              <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 700 }}>
                Tanggal
              </Typography>
              <Flatpickr
                ref={datePickerRef}
                value={selectedDateRange}
                options={{ mode: 'range', dateFormat: 'Y-m-d', closeOnSelect: false }}
                onChange={handleTanggalChange}
                render={({ defaultValue }, ref) => (
                  <TextField
                    inputRef={ref}
                    defaultValue={defaultValue}
                    value={tanggalLabel}
                    label="Range Tanggal"
                    fullWidth
                    placeholder="Pilih range tanggal"
                    InputLabelProps={{ shrink: true }}
                    onClick={() => datePickerRef.current?.flatpickr?.open()}
                  />
                )}
              />
            </Box>
          </Stack>
        </MainCard>
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <Grid container spacing={3}>
          {laporanCards.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
              <ButtonBase
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  textAlign: 'left'
                }}
              >
                <MainCard
                  sx={{
                    width: '100%',
                    minHeight: 220,
                    borderRadius: 4,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Stack alignItems="center" justifyContent="center" spacing={2.5} sx={{ minHeight: 160 }}>
                    <Box
                      sx={{
                        width: 88,
                        height: 88,
                        borderRadius: 3,
                        bgcolor: 'error.lighter',
                        color: 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FilePdfOutlined style={{ fontSize: 56 }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                      {item.title}
                    </Typography>
                  </Stack>
                </MainCard>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
