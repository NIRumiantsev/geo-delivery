import { Form } from 'UI';
import { serviceMap } from 'core';
import { AuthDto } from 'types';
import { cn } from 'utils';

import './LoginForm.sass';

const cnLoginForm = cn('LoginForm');

type LoginFormProps = {
  submitAction?: () => void,
  additionalButtonAction?: () => void,
};

const LoginForm = (props: LoginFormProps) => {
  const {
    submitAction = () => {},
    additionalButtonAction = () => {}
  } = props;

  const handleSubmit = async (formState: AuthDto) => {
    await serviceMap.auth.login(formState)
    submitAction();
  };

  return (
    <Form
      className={cnLoginForm()}
      title="Авторизация"
      onError={() => serviceMap.logger.error('Требуется заполнить все обязательные поля')}
      onSubmit={(formState) => handleSubmit(formState as AuthDto)}
    >
      <Form.Field
        label="E-mail / Телефон / Telegram*"
        name="login"
        required
      />
      <Form.Field
        label="Пароль*"
        name="password"
        password
        required
      />
      <Form.Footer
        submitText="Отправить"
        leftButtonText="Создать аккаунт"
        leftButtonHandler={additionalButtonAction}
        leftButtonShown
      />
    </Form>
  )
};

export { LoginForm };