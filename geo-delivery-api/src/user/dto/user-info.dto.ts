import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../types';

export class UserInfoDto {
  @IsString()
  name: string;

  @IsEnum(UserType)
  city: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  description?: string;
}