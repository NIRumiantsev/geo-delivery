import { UserInfoDto, UserRole } from '.';

export type UserDto = {
  _id: string,
  login: string,
  password: string,
  role: UserRole,
  info?: UserInfoDto,
};