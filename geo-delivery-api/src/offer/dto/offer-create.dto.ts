import { IsEnum, IsString } from 'class-validator';
import { OfferTypes } from '../types';

export class OfferCreateDto {
  @IsString()
  targetId: string;

  @IsEnum(OfferTypes)
  targetType: string;

  @IsString()
  senderId: string;

  @IsString()
  addresseeId: string;
}