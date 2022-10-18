import { UserInfoDto } from '.';

export type UserDto = {
  login: string,
  password: string,
  role: string,
  info?: UserInfoDto,
};