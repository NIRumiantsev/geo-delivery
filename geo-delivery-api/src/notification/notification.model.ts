import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface NotificationModel extends Base {}
export class NotificationModel extends TimeStamps {
  @prop()
  userId: string;

  @prop()
  content: string;

  @prop()
  status: string;
}