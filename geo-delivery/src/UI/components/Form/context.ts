import { createContext, useContext } from 'react';
import { FormSize, FormState } from './types';

export type FormContextData = {
  formState: FormState,
  size: FormSize,
  submitted: boolean,
  formChanged: boolean,
  onChangeField: (fieldName: string, value: string | number) => void,
  onFormSubmit: () => void,
  onFormCancel: () => void,
};

export const FormContext = createContext<FormContextData>({
  formState: {},
  size: 'small',
  submitted: false,
  formChanged: false,
  onChangeField: () => {},
  onFormSubmit: () => {},
  onFormCancel: () => {},
});

export const useFormContext = () => useContext(FormContext);