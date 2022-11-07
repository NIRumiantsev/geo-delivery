import { observer } from 'mobx-react';
import { omit } from 'lodash';
import { Form } from 'UI';
import { UserInfoDto, UserInfoFormDto } from 'types';
import { serviceMap } from 'core';
import { USER_ROLE } from 'core/services';
import { userStore } from 'core/stores';
import { userTypeOptions } from './constants';
import { InfoFormAuto } from './subcomponents';

type InfoFormProps = {
  submitAction?: () => void,
};

const InfoForm = observer((props: InfoFormProps) => {
  const { submitAction = () => {} } = props;

  const userId = userStore.user?._id;
  const userRole = serviceMap.storage.getLocalItem(USER_ROLE);

  const handleSubmit = async (formState: UserInfoFormDto) => {
    if (!userId) return;

    const userInfo: UserInfoDto = omit(formState, 'auto');

    if (formState.auto) {
      userInfo.autoIdList = await serviceMap.auto.createUserAutoList(formState.auto.map((auto) => ({...auto, userId})));
    }

    await serviceMap.user.updateUserInfo(userId, userInfo);
    submitAction();
  };

  return (
    <Form
      title="Личная информация"
      onError={() => serviceMap.logger.error('Требуется заполнить все обязательные поля')}
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