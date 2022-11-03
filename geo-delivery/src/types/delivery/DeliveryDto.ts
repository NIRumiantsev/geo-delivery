import { RoutePoint } from 'types';

export type DeliveryDto = {
  moverId: string;
  autoId: string;
  departureCity: RoutePoint;
  waypoints: RoutePoint[];
  destination: RoutePoint;
  passengersLeft?: number;
  cargoLeft?: number;
};