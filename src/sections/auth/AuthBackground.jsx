// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Logo from 'assets/logo/logo-rs.png';

export default function AuthBackground() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed', // Gunakan fixed agar menutupi seluruh layar background
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        display: 'flex',
        alignItems: 'center', // Sama dengan 'center' pada background-position
        justifyContent: 'flex-start', // Sama dengan 'left' pada background-position
        padding: '24px',
        overflow: 'hidden',
        pointerEvents: 'none' // Agar tidak menghalangi klik pada form
      }}
    >
      <Box
        component="img"
        src={Logo}
        sx={{
          // Mengikuti logika CSS: background-size: auto 75%
          height: '75vh', 
          width: 'auto',
          
          // Opsional: Jika ingin mempertahankan blur dari kode asli Anda
          filter: 'blur(18px)', 
          
          // Responsivitas: Mengecil di layar mobile
          [theme.breakpoints.down('md')]: {
            height: '40vh',
            opacity: 0.5 // Mengurangi distraksi di layar kecil
          }
        }}
      />
    </Box>
  );
}