import { UserInfoDto } from '.';

export type UserDto = {
  _id: string,
  login: string,
  password: string,
  role: string,
  info?: UserInfoDto,
};