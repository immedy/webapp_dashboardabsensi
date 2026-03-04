import PropTypes from 'prop-types';

// MUI
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

/**
 * Reusable Autocomplete Component
 */
export default function InputAutoComplete({
  label,
  options = [],
  value,
  onChange,
  loading = false,
  labelKey = 'name',
  placeholder = '',
  size = 'medium',
  fullWidth = true,
  sx
}) {
  return (
    <Autocomplete
      fullWidth={fullWidth}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => onChange?.(newValue)}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option?.[labelKey] || ''
      }
      isOptionEqualToValue={(option, val) => option?.id === val?.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          size={size}
        />
      )}
      sx={sx}
    />
  );
}

InputAutoComplete.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  labelKey: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  fullWidth: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func])
};
