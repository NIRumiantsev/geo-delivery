import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../types';

export class UserInfoDto {
  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsEnum(UserType)
  type: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  description?: string;
}