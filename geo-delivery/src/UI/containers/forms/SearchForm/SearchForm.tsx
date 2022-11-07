import { Form, ListType } from 'UI';
import { serviceMap } from 'core';
import { DeliverySearchParams, OrderSearchParams } from 'types';

export type SearchFormProps = {
  listType: ListType,
};

const SearchForm = (props: SearchFormProps) => {
  const { listType } = props;

  const handleSearchDelivery = async (params: DeliverySearchParams) => {
    await serviceMap.delivery.searchDeliveries(params);
  };

  const handleSearchOrder = async (params: OrderSearchParams) => {
    await serviceMap.order.searchOrders(params);
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
            type="city"
          />
          <Form.Field
            label="Город получения"
            name="destinationCity"
            type="city"
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