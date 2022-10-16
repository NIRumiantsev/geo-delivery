import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../types/UserRole';

export class UserCreateDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: string;
}