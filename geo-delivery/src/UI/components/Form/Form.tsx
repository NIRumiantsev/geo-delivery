import { ReactElement, useState, CSSProperties, useMemo, useEffect, Children } from 'react';
import { set, cloneDeep, isEqual, get } from 'lodash';
import { FormContext } from './context';
import { Field, Row, Footer, Block } from './subcomponents';
import { FormSize, FormState } from './types';
import { cnForm } from './helpers';
import { Typography } from '@mui/material';

type FormChildren = ReactElement | (ReactElement | null)[] | null;

type FormProps = {
  children: FormChildren,
  defaultState?: FormState,
  className?: string,
  style?: CSSProperties,
  size?: FormSize,
  width?: number,
  title?: string,
  customFormChangeCheck?: boolean,
  onSubmit: (formState: FormState) => void,
  onCancel?: () => void,
  onError?: () => void,
  customValidateForm?: (formState: FormState) => boolean,
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
    onError = () => {},
    customValidateForm = () => true,
    customChangeHandler = (formState) => formState,
  } = props;

  const [formState, setFormState] = useState<FormState>(defaultState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [requiredFields, setRequiredFields] = useState<string[]>([]);

  useEffect(() => {
    if (!children) return;
    const newRequiredFields: Set<string> = new Set();
    const checkRequiredChildren = (children: FormChildren) => {
      Children.map(children, (child) => {
        if (child?.props?.required) {
          newRequiredFields.add(child?.props?.name);
        }
        if (child?.props?.children?.length > 0) {
          checkRequiredChildren(child?.props?.children);
        }
      });
    };
    checkRequiredChildren(children);
    setRequiredFields(Array.from(newRequiredFields));
  }, [children]);

  const formChanged = useMemo(() => !isEqual(formState, defaultState) || customFormChangeCheck ,
    [defaultState, formState, customFormChangeCheck]
  );

  const onChangeField = (fieldName: string, value: any) => {
    const newState = cloneDeep(formState);
    set(newState, fieldName, value);
    setFormState(customChangeHandler(newState, fieldName));
  };

  const validateForm = () => {
    const isRequiredFields = requiredFields.length === 0 || requiredFields.every((field) => get(formState, field));
    const isCustomValid = customValidateForm(formState);
    return isRequiredFields && isCustomValid;
  };

  const onFormSubmit = () => {
    setSubmitted(true);
    if (validateForm()) {
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
        <Typography
          variant="h5"
          color="inherit"
        >
          {title}
        </Typography>
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