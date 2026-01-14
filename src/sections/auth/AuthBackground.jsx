// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Logo from 'assets/logo/logo-rs.png';


// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        bottom: 0,
        transform: 'inherit'
      }}
    >
      <img src={Logo} width="40%" height="calc(100vh - 175px)" />
    </Box>
  );
}
