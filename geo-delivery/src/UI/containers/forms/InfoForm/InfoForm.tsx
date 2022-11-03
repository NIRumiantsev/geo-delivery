import { observer } from 'mobx-react';
import { omit } from 'lodash';
import { Form } from 'UI';
import { UserInfoDto, UserInfoFormDto } from 'types';
import { container, identifiers } from 'core';
import { LoggerService, StorageService, UserService, USER_ROLE, AutoService } from 'core/services';
import { userStore } from 'core/stores';
import { userTypeOptions } from './constants';
import { InfoFormAuto } from './subcomponents';

const requiredFields = ['name', 'city', 'type'];

type InfoFormProps = {
  submitAction?: () => void,
};

const userService = container.get<UserService>(identifiers.USER_SERVICE);
const loggerService = container.get<LoggerService>(identifiers.LOGGER_SERVICE);
const storageService = container.get<StorageService>(identifiers.STORAGE_SERVICE);
const autoService = container.get<AutoService>(identifiers.AUTO_SERVICE);

const InfoForm = observer((props: InfoFormProps) => {
  const { submitAction = () => {} } = props;

  const userId = userStore.user?._id;
  const userRole = storageService.getLocalItem(USER_ROLE);

  const handleSubmit = async (formState: UserInfoFormDto) => {
    if (!userId) return;

    const userInfo: UserInfoDto = omit(formState, 'auto');

    if (formState.auto) {
      userInfo.autoIdList = await autoService.createUserAutoList(formState.auto);
    }

    await userService.updateUserInfo(userId, userInfo);
    submitAction();
  };

  return (
    <Form
      title="Личная информация"
      onError={() => loggerService.error('Требуется заполнить все обязательные поля')}
      validateForm={(formState) => requiredFields.every((field) => formState[field])}
      onSubmit={(formState: unknown) => handleSubmit(formState as UserInfoFormDto)}
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
      {userRole === 'mover' ? (
        <InfoFormAuto/>
      ) : null}
      <Form.Footer submitText="Отправить"/>
    </Form>
  )
});

export { InfoForm };