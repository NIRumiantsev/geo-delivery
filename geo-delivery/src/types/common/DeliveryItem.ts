import { RoutePoint } from './RoutePoint';

export type DeliveryItem = {
  departure: RoutePoint,
  destination: RoutePoint,
  cargo: number,
  passengers: number,
  avatar?: string,
};