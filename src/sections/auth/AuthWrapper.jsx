import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project imports
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from './AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <AuthBackground />

      <Stack
        sx={{
          height: '100vh',
          justifyContent: 'space-between'
        }}
      >
        {/* LOGO */}
        <Box sx={{ px: 3, pt: 3 }}>
          <Logo
            to="/"
            sx={{
              width: 500,   
              mx: 'auto'
            }}
          />
        </Box>

        {/* AUTH CARD */}
        <Grid container justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
          <AuthCard>{children}</AuthCard>
        </Grid>

        {/* FOOTER */}
        <Box sx={{ p: 2 }}>
          <AuthFooter />
        </Box>
      </Stack>
    </Box>
  );
}



AuthWrapper.propTypes = { children: PropTypes.node };
