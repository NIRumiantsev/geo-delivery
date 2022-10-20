import { Select, MenuItem, TextField } from '@mui/material';
import { FieldInputProps } from '../../types';

const SelectField = (props: FieldInputProps) => {
  const { options, onChange, value } = props;

  return (
    <TextField
      {...props}
      select
      value={value || ''}
      onChange={(event) => {onChange(event.target.value)}}
    >
      {options?.map(({ value, label }) => (
        <MenuItem
          key={value}
          value={value}
        >
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export { SelectField };