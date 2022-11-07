import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Form } from 'UI';
import { serviceMap } from 'core';
import { userStore, autoStore } from 'core/stores';
import { BasicOption, DeliveryDto } from 'types';
import { DeliveryWaypoints } from './subcomponents';

type DeliveryFormState = Omit<DeliveryDto, 'moverId'>;

const CreateDeliveryForm = observer(() => {
  const user = userStore.user;
  const autoList = autoStore.autoList;

  const navigate = useNavigate();

  const autoOptions: BasicOption[] = useMemo(() => autoList.map(({ _id, model }) =>
    ({ value: _id, label: model })
  ), [autoList]);

  const handleCreateDelivery = async (formState: DeliveryFormState) => {
    if (!user) return;
    await serviceMap.delivery.createDelivery({ moverId: user._id, ...formState });
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleAutoSelect = (formState: Partial<DeliveryFormState>) => {
    const selectedAuto = autoList.find((auto) => auto._id === formState.autoId);
    if (selectedAuto) {
      formState.cargoLeft = selectedAuto.capacity;
      formState.passengersLeft = selectedAuto.passengers;
    }
    return formState;
  };

  const customChangeHandler = (formState: Partial<DeliveryFormState>, fieldName: string) => {
    switch (fieldName) {
      case 'autoId':
        return handleAutoSelect(formState);
      default:
        return formState;
    }
  };

  return (
    <Form
      title="Разместить предложение о перевозке"
      customChangeHandler={(formState: unknown, fieldName) => customChangeHandler(formState as Partial<DeliveryFormState>, fieldName)}
      onSubmit={(formState: unknown) => handleCreateDelivery(formState as Omit<DeliveryDto, 'moverId'>)}
      onCancel={handleCancel}
      onError={() => serviceMap.logger.error('Требуется заполнить все обязательные поля')}
    >
      <Form.Field
        label="Авто для рейса*"
        name="autoId"
        type="select"
        options={autoOptions}
        required
      />
      <Form.Row>
        <Form.Field
          label="Места для пассажиров*"
          name="passengersLeft"
          type="number"
          required
        />
        <Form.Field
          label="Максимальный груз, кг*"
          name="cargoLeft"
          type="number"
          required
        />
      </Form.Row>
      <Form.Row title="Город отправки">
        <Form.Field
          label="Город*"
          name="departureCity.city"
          type="city"
          required
        />
        <Form.Field
          name="departureCity.departure"
          type="date"
          required
        />
      </Form.Row>
      <Form.Row title="Город назначения">
        <Form.Field
          label="Город*"
          name="destination.city"
          type="city"
          required
        />
        <Form.Field
          name="destination.arrive"
          type="date"
          required
        />
      </Form.Row>
      <DeliveryWaypoints/>
      <Form.Footer
        submitText="Разместить"
        cancelText="Отмена"
        cancelShown
      />
    </Form>
  )
});

export { CreateDeliveryForm };