import { observer } from 'mobx-react';
import { Divider, Typography, List, ListItem, ListItemText } from '@mui/material';
import { deliveryStore } from 'core/stores';
import { DeliveryOrderTitle, UserAvatar } from 'UI';
import { cn } from 'utils';

import './DeliveryInfo.sass';

const cnDeliveryInfo = cn('DeliveryInfo');

const DeliveryInfo = observer(() => {
  const delivery = deliveryStore.selectedDelivery;
  const mover = deliveryStore.selectedDeliveryMover;
  const auto = deliveryStore.selectedDeliveryAuto;

  if (!delivery || !mover || !auto) {
    return <Typography>Информация отсутствует</Typography>
  }

  const { departureCity, destination, waypoints } = delivery;

  return (
    <List className={cnDeliveryInfo()}>
      <ListItem>
        <DeliveryOrderTitle
          departure={departureCity}
          destination={destination}
          waypoints={waypoints}
        />
      </ListItem>
      <Divider light/>
      <ListItem sx={{ justifyContent: 'space-between' }}>
        <ListItemText secondary="Водитель:"/>
        <div className={cnDeliveryInfo('user')}>
          <ListItemText primary={mover?.info?.name}/>
          <UserAvatar user={mover}/>
        </div>
      </ListItem>
      <ListItem>
        <ListItemText secondary="Авто:"/>
        <ListItemText
          sx={{ textAlign: 'end' }}
          primary={auto.model}
        />
      </ListItem>
      <ListItem>
        <ListItemText secondary="Пассажирских мест доступно:"/>
        <ListItemText
          sx={{ textAlign: 'end' }}
          primary={`${delivery.passengersLeft || 0}/${auto.passengers || 0}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText secondary="Место для груза доступно:"/>
        <ListItemText
          sx={{ textAlign: 'end' }}
          primary={`${delivery.cargoLeft || 0}/${auto.capacity || 0} кг`}
        />
      </ListItem>
    </List>
  )
});

export { DeliveryInfo };