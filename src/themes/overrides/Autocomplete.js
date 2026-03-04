// ==============================|| OVERRIDES - AUTOCOMPLETE ||============================== //

export default function Autocomplete() {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          '&.MuiOutlinedInput-root': {
            paddingTop: 0,
            paddingBottom: 0
          },
          '& .MuiAutocomplete-input': {
            paddingTop: '10.5px !important',
            paddingBottom: '10.5px !important'
          },
          '&.MuiInputBase-sizeSmall .MuiAutocomplete-input': {
            paddingTop: '7.5px !important',
            paddingBottom: '7.5px !important'
          }
        }
      }
    }
  };
}
