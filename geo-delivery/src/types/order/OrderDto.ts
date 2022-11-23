import { RoutePoint } from 'types';

export type OrderDto = {
  _id: string,
  userId: string,
  passengers?: number,
  cargo?: number,
  departureCity: RoutePoint,
  destination: RoutePoint,
}