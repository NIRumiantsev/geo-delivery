import { ReactElement, useState, CSSProperties, useMemo } from 'react';
import { set, cloneDeep, isEqual } from 'lodash';
import { FormContext } from './context';
import { Field, Row, Footer, Block } from './subcomponents';
import { FormSize, FormState } from './types';
import { cnForm } from './helpers';

type FormProps = {
  children: ReactElement | ReactElement[],
  defaultState?: FormState,
  className?: string,
  style?: CSSProperties,
  size?: FormSize,
  width?: number,
  title?: string,
  customFormChangeCheck?: boolean,
  onSubmit: (formState: FormState) => void,
  onCancel?: () => void,
  validateForm?: (formState: FormState) => boolean,
  onError?: () => void,
  customChangeHandler?: (formState: FormState, fieldName: string) => FormState,
};

const Form = (props: FormProps) => {
  const {
    children,
    defaultState = {},
    style,
    size = 'small',
    customFormChangeCheck = false,
    title,
    className,
    onSubmit,
    onCancel = () => {},
    validateForm = () => true,
    onError = () => {},
    customChangeHandler = (formState) => formState,
  } = props;

  const [formState, setFormState] = useState<FormState>(defaultState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const formChanged = useMemo(() => !isEqual(formState, defaultState) || customFormChangeCheck ,
    [defaultState, formState, customFormChangeCheck]
  );

  const onChangeField = (fieldName: string, value: any) => {
    const newState = cloneDeep(formState);
    set(newState, fieldName, value);
    setFormState(customChangeHandler(newState, fieldName));
  };

  const onFormSubmit = () => {
    setSubmitted(true);
    if (validateForm(formState)) {
      onSubmit(formState);
      setSubmitted(false);
    } else {
      onError();
    }
  };

  const onFormCancel = () => {
    setFormState(defaultState);
    onCancel();
  };

  const contextValue = {
    formState,
    size,
    submitted,
    formChanged,
    onChangeField,
    onFormSubmit,
    onFormCancel
  };

  return (
    <FormContext.Provider value={contextValue}>
      <div
        className={`${cnForm()} ${className}`}
        style={style}
      >
        {title}
        {children}
      </div>
    </FormContext.Provider>
  )
};

Form.Field = Field;
Form.Row = Row;
Form.Footer = Footer;
Form.Block = Block;

export { Form };