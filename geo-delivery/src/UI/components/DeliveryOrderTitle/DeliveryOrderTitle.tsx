import { Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RoutePoint } from 'types';
import { cn } from 'utils';

import './DeliveryOrderTitle.sass';
import { ReactElement, useMemo } from 'react';

const cnDeliveryOrderTitle = cn('DeliveryOrderTitle');

type DeliveryOrderTitleProps = {
  departure: RoutePoint,
  destination: RoutePoint,
  waypoints?: RoutePoint[]
};

const DeliveryOrderTitle = (props: DeliveryOrderTitleProps) => {
  const {
    departure,
    destination,
    waypoints = [],
  } = props;

  const createWaypointItem = (waypoint: RoutePoint) => {
    return (
      <div className={cnDeliveryOrderTitle('waypoint')}>
        <Typography variant="h6">{waypoint.city}</Typography>
        <div className={cnDeliveryOrderTitle('container')}>
          <Typography variant="subtitle2">{waypoint.arrive}</Typography>
          -
          <Typography variant="subtitle2">{waypoint.departure}</Typography>
        </div>
      </div>
    )
  };

  const waypointElements: ReactElement[] = useMemo(() => {
    return waypoints.reduce((acc, waypoint) => {
      if (waypoint.city) {
        acc.push(createWaypointItem(waypoint));
        acc.push(<ArrowForwardIcon/>);
      }
      return acc
    }, [<ArrowForwardIcon/>]);
  }, [waypoints]);

  return (
    <div className={cnDeliveryOrderTitle()}>
      <div className={cnDeliveryOrderTitle('city')}>
        <Typography variant="overline">Отправление</Typography>
        <Typography variant="h5">{departure.city}</Typography>
        <Typography variant="subtitle1">{departure.departure}</Typography>
      </div>
      {waypointElements.map((element) => element)}
      <div className={cnDeliveryOrderTitle('city')}>
        <Typography variant="overline">Прибытие</Typography>
        <Typography variant="h5">{destination.city}</Typography>
        <Typography variant="subtitle1">{destination.arrive}</Typography>
      </div>
    </div>
  )
};

export { DeliveryOrderTitle };