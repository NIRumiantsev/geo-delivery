import { ChangeEvent, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Pagination, Typography } from '@mui/material';
import { ItemCard } from 'UI';
import { deliveryStore, orderStore } from 'core/stores';
import { DeliveryItem } from 'types';
import { cn } from 'utils';

import './ItemList.sass';

const cnItemList = cn('ItemList');

export type ListType = 'delivery' | 'order';

export type ItemListProps = {
  listType: ListType,
  itemsNumber: number,
  handleChangeItemsPage: (page: number) => void,
};

const placeholderMap: Record<ListType, string> = {
  delivery: 'Предложения не найдены',
  order: 'Заказы не найдены',
};

const ItemList = observer((props: ItemListProps) => {
  const { listType, itemsNumber, handleChangeItemsPage } = props;

  const deliveryList = deliveryStore.deliveryList;
  const totalDeliveries = deliveryStore.totalDeliveries;
  const orderList = orderStore.orderList;
  const totalOrders = orderStore.totalOrders;

  const deliveryItems: DeliveryItem[] = useMemo(() => deliveryList.map((delivery) => ({
    departure: delivery.departureCity,
    destination: delivery.destination,
    cargo: delivery.cargoLeft || 0,
    passengers: delivery.passengersLeft || 0,
  })), [deliveryList]);

  const orderItems: DeliveryItem[] = useMemo(() => orderList.map((order) => ({
    departure: order.departureCity,
    destination: order.destination,
    cargo: order.cargo || 0,
    passengers: order.passengers || 0,
  })), [orderList]);

  const itemListMap: Record<ListType, DeliveryItem[]> = {
    delivery: deliveryItems,
    order: orderItems,
  };

  const countMap: Record<ListType, number> = {
    delivery: Math.ceil(totalDeliveries / itemsNumber),
    order: Math.ceil(totalOrders / itemsNumber),
  };

  const handleChangePagination = (e: ChangeEvent<unknown>, page: number) => {
    handleChangeItemsPage(page - 1);
  };

  if (!itemListMap[listType]?.length) {
    return (
      <div className={cnItemList('placeholder')}>
        <Typography variant="h5">{placeholderMap[listType]}</Typography>
        <Typography variant="caption">Попробуйте изменить параметры поиска</Typography>
      </div>
    )
  }

  return (
    <div className={cnItemList()}>
      <div className={cnItemList('container')}>
        {itemListMap[listType].map((item) => <ItemCard item={item}/>)}
      </div>
      <Pagination
        onChange={handleChangePagination}
        count={countMap[listType]}
      />
    </div>
  )
});

export { ItemList };