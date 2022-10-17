import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

class RoutePoint {
  @prop()
  city: string;

  @prop()
  departure?: string;

  @prop()
  arrive?: string;
}

export interface DeliveryModel extends Base {}
export class DeliveryModel extends TimeStamps {
  @prop()
  moverId: string;

  @prop()
  autoId: string;

  @prop()
  passengersLeft?: number;

  @prop()
  cargoLeft?: number;

  @prop({ type: () => RoutePoint })
  departureCity: RoutePoint;

  @prop( { type: () => [RoutePoint] })
  waypoints: RoutePoint[];
  
  @prop({ type: () => RoutePoint })
  destination: RoutePoint;
}