import { RoutePoint } from 'types';

export type OrderDto = {
  userId: string,
  passengers?: number,
  cargo?: number,
  departureCity: RoutePoint,
  destination: RoutePoint,
}