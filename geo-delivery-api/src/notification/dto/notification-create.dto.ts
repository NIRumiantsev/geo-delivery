import { IsEnum, IsString } from 'class-validator';
import { NotificationStatus } from '../types';

export class NotificationCreateDto {
  @IsString()
  userId: string;

  @IsString()
  content: string;

  @IsEnum(NotificationStatus)
  status: string;
}
