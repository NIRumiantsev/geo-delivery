import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface OfferModel extends Base {}
export class OfferModel extends TimeStamps {
  @prop()
  targetId: string;

  @prop()
  targetType: string;

  @prop()
  senderId: string;

  @prop()
  addresseeId: string;

  @prop()
  accepted?: boolean;
}