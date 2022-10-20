import { TextField as Input } from '@mui/material';
import { FieldInputProps } from '../../types';

const NumberField = (props: FieldInputProps) => {
  const { value, onChange } = props;

  return (
    <Input
      {...props}
      value={value?.toString() || ''}
      onChange={(event) => {
        onChange(Number(event.target.value))
      }}
    />
  );
};

export { NumberField };