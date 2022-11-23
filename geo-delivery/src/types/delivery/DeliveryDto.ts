import { RoutePoint } from 'types';

export type DeliveryDto = {
  _id: string,
  moverId: string,
  autoId: string,
  departureCity: RoutePoint,
  waypoints: RoutePoint[],
  destination: RoutePoint,
  passengersLeft?: number,
  cargoLeft?: number,
};