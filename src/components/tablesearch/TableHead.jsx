import PropTypes from 'prop-types';
import TableHeadMui from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function TableHead({ columns }) {
  return (
    <TableHeadMui>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            align={col.align || 'left'}
            padding={col.disablePadding ? 'none' : 'normal'}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHeadMui>
  );
}

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      disablePadding: PropTypes.bool
    })
  ).isRequired
};
