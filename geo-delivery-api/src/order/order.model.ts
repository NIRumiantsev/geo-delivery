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

export interface OrderModel extends Base {}
export class OrderModel extends TimeStamps {
  @prop()
  userId: string;

  @prop()
  passengers?: number;

  @prop()
  cargo?: number;

  @prop({ type: () => RoutePoint })
  departureCity: RoutePoint;

  @prop({ type: () => RoutePoint })
  destination: RoutePoint;
}