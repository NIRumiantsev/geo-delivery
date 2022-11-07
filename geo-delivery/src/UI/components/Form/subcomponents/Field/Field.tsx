import { get } from 'lodash';
import { BasicOption } from 'types';
import {
  TextField,
  NumberField,
  SelectField, DateField, CityField,
} from './subcomponents';
import { FieldInputProps } from './types';
import { useFormContext } from '../../context';
import { cnForm } from '../../helpers';
import { FormState } from '../../types';

enum FieldTypes {
  text = 'text',
  number = 'number',
  select = 'select',
  date = 'date',
  city = 'city',
}

type FieldProps = {
  name: string,
  placeholder?: string,
  type?: keyof typeof FieldTypes,
  label?: string,
  disabled?: boolean,
  required?: boolean,
  readonly?: boolean,
  multiline?: boolean,
  password?: boolean,
  options?: BasicOption[],
  validateField?: (value: string | number) => boolean,
  checkForError?: (value: string | number) => boolean,
  customFormat?: (value: any, formState: FormState ) => string | number,
};

const Field = (props: FieldProps) => {
  const {
    name,
    required = false,
    type = FieldTypes.text,
    password,
    validateField = () => true,
    checkForError = () => true,
    customFormat = (value) => value,
    ...inputProps
  } = props;

  const {
    formState,
    size,
    submitted,
    onChangeField
  } = useFormContext();

  const handleChangeField = (value: string | number) => {
    if (validateField(value)) {
      onChangeField(name, value);
    }
  };

  const commonProps: FieldInputProps = {
    ...inputProps,
    size,
    password: password ? 'password' : '',
    value: customFormat(get(formState, name), formState),
    error: submitted && ((required && !(get(formState, name) || typeof get(formState, name) === 'number')) || !checkForError(formState[name])),
    className: cnForm('field'),
    onChange: (value: string | number) => handleChangeField(customFormat(value, formState)),
  };

  const fieldMap: Record<keyof typeof FieldTypes, JSX.Element> = {
    text: <TextField {...commonProps}/>,
    number: <NumberField {...commonProps}/>,
    select: <SelectField {...commonProps}/>,
    date: <DateField {...commonProps}/>,
    city: <CityField {...commonProps}/>,
  };

  return fieldMap[type]
};

export { Field };