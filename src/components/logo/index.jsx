import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

// assets
import LogoDara from '../../assets/logo/logodara.png';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ sx, to }) {
  const logo = (
    <Box
      component="img"
      src={LogoDara}
      alt="Logo"
      sx={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        ...sx
      }}
    />
  );

  if (to) {
    return (
      <ButtonBase component={RouterLink} to={to} sx={{ p: 0 }}>
        {logo}
      </ButtonBase>
    );
  }

  return logo;
}

LogoSection.propTypes = {
  sx: PropTypes.any,
  to: PropTypes.string
};
