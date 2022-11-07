import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Form } from 'UI';
import { serviceMap } from 'core';
import { userStore } from 'core/stores';
import { DeliveryDto, OrderDto } from 'types';

type OrderFormState = Omit<OrderDto, 'userId'>;

const CreateOrderForm = observer(() => {
  const user = userStore.user;

  const navigate = useNavigate();

  const handleCreateDelivery = async (formState: OrderFormState) => {
    if (!user) return;
    await serviceMap.order.createOrder({ userId: user._id, ...formState })
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Form
      title="Разместить заказ на перевозку"
      onSubmit={(formState: unknown) => handleCreateDelivery(formState as Omit<DeliveryDto, 'moverId'>)}
      onCancel={handleCancel}
      onError={() => serviceMap.logger.error('Требуется заполнить все обязательные поля')}
    >
      <Form.Row>
        <Form.Field
          label="Пассажиры*"
          name="passengersLeft"
          type="number"
          required
        />
        <Form.Field
          label="Примерный вес груза, кг*"
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
      <Form.Footer
        submitText="Разместить"
        cancelText="Отмена"
        cancelShown
      />
    </Form>
  )
});

export { CreateOrderForm };