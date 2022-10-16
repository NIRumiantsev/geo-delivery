import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserInfoDto } from './user-info.dto';
import { UserRole } from '../types';

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