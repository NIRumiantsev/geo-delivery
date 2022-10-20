import { ChangeEventHandler } from 'react';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { BasicOption } from 'types';
import { FormSize } from '../../types';

export type FieldInputProps = {
  size: FormSize,
  error: boolean,
  value: any,
  onChange: (value: string | number) => void,
  title?: string,
  options?: BasicOption[],
  className?: string,
  disabled?: boolean,
  placeholder?: string,
  readOnly?: boolean,
  password?: boolean,
}