import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import AnimateButton from 'components/@extended/AnimateButton';

export default function ActionCell({ children, align = 'right' }) {
  return (
    <TableCell align={align}>
      <Stack
        direction="row"
        spacing={1}
        justifyContent={align === 'right' ? 'flex-end' : 'flex-start'}
      >
        <AnimateButton>
        {children}
        </AnimateButton>
      </Stack>
    </TableCell>
  );
}

ActionCell.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center'])
};
