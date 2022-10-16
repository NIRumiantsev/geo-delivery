import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserInfoDto } from './user-info.dto';
import { UserType } from '../types';
import { UserRole } from '../types/UserRole';

export class UserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: string;

  @IsOptional()
  @ValidateNested()
  info?: UserInfoDto
}