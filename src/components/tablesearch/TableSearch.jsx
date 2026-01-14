import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import SearchOutlined from '@ant-design/icons/SearchOutlined';

export default function TableSearch({
  value,
  onChange,
  placeholder = 'Cari data...'
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth>
        <OutlinedInput
          size="small"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}

TableSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};
