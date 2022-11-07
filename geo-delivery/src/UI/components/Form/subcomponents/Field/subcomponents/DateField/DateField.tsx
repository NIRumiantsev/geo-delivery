import { TextField as Input } from '@mui/material';
import { FieldInputProps } from '../../types';

const DateField = (props: FieldInputProps) => {
  const { value, onChange } = props;

  return (
    <Input
      {...props}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type="date"
    />
  );
};

export { DateField };