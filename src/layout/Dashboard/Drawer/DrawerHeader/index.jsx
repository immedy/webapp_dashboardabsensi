import PropTypes from 'prop-types';

// project imports
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  return (
    <DrawerHeaderStyled
      open={open}
      sx={{
        minHeight: '60px',
        paddingY: 1,
        paddingLeft: open ? 3 : 1,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Logo
        to="/"
        sx={{
          width: open ? 220 : 40,
          height: 40,
          transition: 'width 0.3s ease'
        }}
      />
    </DrawerHeaderStyled>
  );
}


DrawerHeader.propTypes = { open: PropTypes.bool };
