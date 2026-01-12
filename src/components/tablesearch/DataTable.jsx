import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

export default function DataTable({ children }) {
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table>
          {children}
        </Table>
      </TableContainer>
    </Box>
  );
}

DataTable.propTypes = {
  children: PropTypes.node.isRequired
};
