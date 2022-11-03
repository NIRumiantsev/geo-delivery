import { Form, ListType } from 'UI';
import { container, identifiers } from 'core';
import { DeliveryService, OrderService } from 'core/services';
import { DeliverySearchParams, OrderSearchParams } from 'types';

export type SearchFormProps = {
  listType: ListType,
};

const deliveryService = container.get<DeliveryService>(identifiers.DELIVERY_SERVICE);
const orderService = container.get<OrderService>(identifiers.ORDER_SERVICE);

const SearchForm = (props: SearchFormProps) => {
  const { listType } = props;

  const handleSearchDelivery = async (params: DeliverySearchParams) => {
    await deliveryService.searchDeliveries(params);
  };

  const handleSearchOrder = async (params: OrderSearchParams) => {
    await orderService.searchOrders(params);
  };

  return (
    <Form
      title="Поиск по параметрам"
      onSubmit={listType === 'delivery' ? handleSearchDelivery : handleSearchOrder}
    >
      <Form.Block >
        <Form.Row>
          <Form.Field
            label="Город отправки"
            name="departureCity"
          />
          <Form.Field
            label="Город получения"
            name="destinationCity"
          />
          <Form.Field
            label="Пассажиры"
            type="number"
            name="passengers"
          />
          <Form.Field
            label="Груз, кг"
            type="number"
            name="cargoVolume"
          />
          <Form.Footer
            submitText="Поиск"
          />
        </Form.Row>
      </Form.Block>
    </Form>
  )
}

export { SearchForm };