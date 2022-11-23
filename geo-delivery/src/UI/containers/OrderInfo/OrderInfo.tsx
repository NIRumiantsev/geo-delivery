import { observer } from 'mobx-react';
import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { deliveryStore, orderStore } from 'core/stores';
import { DeliveryOrderTitle, UserAvatar } from 'UI';
import { cn } from 'utils';

import './OrderInfo.sass';

const cnOrderInfo = cn('OrderInfo');

const OrderInfo = observer(() => {
  const order = orderStore.selectedOrder;
  const customer = orderStore.selectedOrderCustomer;

  if (!order || !customer) {
    return <Typography>Информация отсутствует</Typography>
  }

  const { departureCity, destination } = order;

  return (
    <List className={cnOrderInfo()}>
      <ListItem>
        <DeliveryOrderTitle
          departure={departureCity}
          destination={destination}
        />
      </ListItem>
      <Divider light/>
      <ListItem sx={{ justifyContent: 'space-between' }}>
        <ListItemText secondary="Заказчик:"/>
        <div className={cnOrderInfo('user')}>
          <ListItemText primary={customer?.info?.name}/>
          <UserAvatar user={customer}/>
        </div>
      </ListItem>
      <ListItem>
        <ListItemText secondary="Пассажиры:"/>
        <ListItemText
          sx={{ textAlign: 'end' }}
          primary={`${order.passengers || 0}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText secondary="Груз:"/>
        <ListItemText
          sx={{ textAlign: 'end' }}
          primary={`${order.cargo || 0} кг`}
        />
      </ListItem>
    </List>
  )
});

export { OrderInfo };