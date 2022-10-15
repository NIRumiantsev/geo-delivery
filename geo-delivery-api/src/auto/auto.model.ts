import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface AutoModel extends Base {}
export class AutoModel extends TimeStamps {
  @prop()
  userId: string

  @prop()
  model: string

  @prop()
  avatar?: string

  @prop()
  capacity?: number

  @prop()
  passengers?: number
}