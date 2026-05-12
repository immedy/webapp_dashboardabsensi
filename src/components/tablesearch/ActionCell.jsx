import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import AnimateButton from 'components/@extended/AnimateButton';

export default function ActionCell({ children, align = 'right' }) {
  const justifyContent = align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';

  return (
    <TableCell align={align}>
      <Stack direction="row" spacing={1} justifyContent={justifyContent} alignItems="center">
        <AnimateButton>{children}</AnimateButton>
      </Stack>
    </TableCell>
  );
}

ActionCell.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center'])
};
