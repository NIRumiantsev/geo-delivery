import { Form } from 'UI';
import { container, identifiers } from 'core';
import { UserService, StorageService, LoggerService, AuthService, USER_ROLE } from 'core/services';
import { AuthDto } from 'types';

type RegistrationFormProps = {
  submitAction?: () => void;
  additionalButtonAction?: () => void;
};

const RegistrationForm = (props: RegistrationFormProps) => {
  const {
    submitAction = () => {},
    additionalButtonAction = () => {},
  } = props;

  const userService = container.get<UserService>(identifiers.USER_SERVICE);
  const authService = container.get<AuthService>(identifiers.AUTH_SERVICE);
  const storageService = container.get<StorageService>(identifiers.STORAGE_SERVICE);
  const loggerService = container.get<LoggerService>(identifiers.LOGGER_SERVICE);

  const handleSubmit = async (formState: AuthDto) => {
    const role = storageService.getItem(USER_ROLE);
    if (role) {
      await userService.createUser({ ...formState, role });
      await authService.login(formState);
      submitAction();
    }
  };

  return (
    <Form
      title="Регистрация"
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
        leftButtonText="У меня уже есть аккаунт"
        leftButtonHandler={additionalButtonAction}
        leftButtonShown
      />
    </Form>
  )
};

export { RegistrationForm };