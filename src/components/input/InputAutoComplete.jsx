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
  getOptionLabel,
  isOptionEqualToValue,
  renderOption,
  placeholder = '',
  size = 'medium',
  fullWidth = true,
  required = false,
  sx
}) {
  const resolvedGetOptionLabel = getOptionLabel || ((option) =>
    typeof option === 'string' ? option : option?.[labelKey] || ''
  );

  const resolvedIsOptionEqualToValue = isOptionEqualToValue || ((option, val) => option?.id === val?.id);

  return (
    <Autocomplete
      fullWidth={fullWidth}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => onChange?.(newValue)}
      getOptionLabel={resolvedGetOptionLabel}
      isOptionEqualToValue={resolvedIsOptionEqualToValue}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          size={size}
          required={required}
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
  getOptionLabel: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  renderOption: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func])
};
