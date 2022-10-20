import { TextField as Input } from '@mui/material';
import { FieldInputProps } from '../../types';

const TextField = (props: FieldInputProps) => {
  const { value, password,  onChange } = props;

  return (
    <Input
      {...props}
      type={password ? 'password' : 'text'}
      value={value?.toString() || ''}
      onChange={(event) => onChange(event.target.value)}
    />
  )
};

export { TextField };