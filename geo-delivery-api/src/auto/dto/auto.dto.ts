import { IsString, IsOptional, IsNumber } from 'class-validator';

export class AutoDto {
  @IsString()
  userId: string

  @IsString()
  model: string

  @IsOptional()
  @IsString()
  avatar?: string

  @IsOptional()
  @IsNumber()
  capacity?: number

  @IsOptional()
  @IsNumber()
  passengers?: number
}