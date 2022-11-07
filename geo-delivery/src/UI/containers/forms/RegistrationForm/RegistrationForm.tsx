import { Form } from 'UI';
import { serviceMap } from 'core';
import { USER_ROLE } from 'core/services';
import { AuthDto, UserRole } from 'types';

type RegistrationFormProps = {
  submitAction?: () => void;
  additionalButtonAction?: () => void;
};

const RegistrationForm = (props: RegistrationFormProps) => {
  const {
    submitAction = () => {},
    additionalButtonAction = () => {},
  } = props;

  const handleSubmit = async (formState: AuthDto) => {
    const role: UserRole = serviceMap.storage.getLocalItem<UserRole>(USER_ROLE);
    if (role) {
      await serviceMap.user.createUser({ ...formState, role });
      await serviceMap.auth.login(formState);
      submitAction();
    }
  };

  return (
    <Form
      title="Регистрация"
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
        leftButtonText="У меня уже есть аккаунт"
        leftButtonHandler={additionalButtonAction}
        leftButtonShown
      />
    </Form>
  )
};

export { RegistrationForm };