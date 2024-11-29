import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';

export default function CustomSelect({name, label, value, options, handleChange, error}){
  return(
    <FormControl 
      fullWidth margin="dense"
      error={!!error}
    >
      <InputLabel>{label}</InputLabel>
      <Select 
      name={name} 
      value={value} 
      onChange={handleChange} 
      >
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.nombre}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error?._errors?.[0]}</FormHelperText>}
    </FormControl>
  );
}

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.object,
}