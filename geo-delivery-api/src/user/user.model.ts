import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class UserInfo {
  @prop()
  name: string;

  @prop()
  city: string;

  @prop()
  type: string;

  @prop()
  avatar?: string;

  @prop()
  description?: string;
}

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @prop({ unique: true })
  login: string;

  @prop()
  passwordHash: string;

  @prop()
  info?: UserInfo
}