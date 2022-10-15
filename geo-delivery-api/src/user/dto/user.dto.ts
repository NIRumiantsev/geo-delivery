import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserInfoDto } from './user-info.dto';

export class UserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsOptional()
  @ValidateNested()
  info?: UserInfoDto
}