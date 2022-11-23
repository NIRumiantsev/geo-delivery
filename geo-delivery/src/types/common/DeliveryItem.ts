import { RoutePoint } from './RoutePoint';
import { ListType } from './ListType';

export type DeliveryItem = {
  id: string,
  type: ListType,
  departure: RoutePoint,
  destination: RoutePoint,
  cargo: number,
  passengers: number,
  avatar?: string,
};