import { observer } from 'mobx-react';
import { Form } from 'UI';
import { UserInfoDto, UserRole } from 'types';
import { container, identifiers } from 'core';
import { LoggerService, UserService } from 'core/services';
import { userStore } from 'core/stores';
import { userTypeOptions } from './constants';

const requiredFields = ['name', 'city', 'type'];

const InfoForm = observer(() => {
  const userId = userStore.user?._id;
  const userService = container.get<UserService>(identifiers.USER_SERVICE);
  const loggerService = container.get<LoggerService>(identifiers.LOGGER_SERVICE);

  const handleSubmit = async (formState: UserInfoDto) => {
    if (userId) {
      await userService.updateUserInfo(userId, formState);
    }
  };

  return (
    <Form
      title="Личная информация"
      onError={() => loggerService.error('Требуется заполнить все обязательные поля')}
      validateForm={(formState) => requiredFields.every((field) => formState[field])}
      onSubmit={(formState: unknown) => handleSubmit(formState as UserInfoDto)}
    >
      <Form.Field
        required
        label="ФИО*"
        name="name"
      />
      <Form.Field
        required
        label="Город*"
        name="city"
      />
      <Form.Field
        required
        label="Тип клиента*"
        type="select"
        name="type"
        options={userTypeOptions}
      />
      <Form.Field
        label="Дополнительное описание"
        multiline
        name="description"
      />
      <Form.Footer submitText="Отправить"/>
    </Form>
  )
});

export { InfoForm };