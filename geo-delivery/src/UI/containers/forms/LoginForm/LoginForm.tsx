import { Form } from 'UI';
import { container, identifiers } from 'core';
import { AuthService, LoggerService } from 'core/services';
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

  const authService = container.get<AuthService>(identifiers.AUTH_SERVICE);
  const loggerService = container.get<LoggerService>(identifiers.LOGGER_SERVICE);

  const handleSubmit = async (formState: AuthDto) => {
    await authService.login(formState)
    submitAction();
  };

  return (
    <Form
      className={cnLoginForm()}
      title="Авторизация"
      onError={() => loggerService.error('Требуется заполнить все обязательные поля')}
      validateForm={(formState) => Object.values(formState).every((value) => value)}
      onSubmit={(formState) => handleSubmit(formState as AuthDto)}
    >
      <Form.Field
        label="E-mail / Телефон / Telegram"
        name="login"
      />
      <Form.Field
        label="Пароль"
        name="password"
        password
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