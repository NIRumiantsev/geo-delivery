import { IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}