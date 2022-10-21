import { AutoCreateDto } from '../auto';

export type UserInfoFormDto = {
  name: string,
  city: string,
  type: string,
  avatar?: string;
  description?: string;
  auto?: AutoCreateDto[];
};