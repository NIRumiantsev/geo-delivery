import { IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';

class UpdateRoutePoint {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  departure?: string;

  @IsOptional()
  @IsString()
  arrive?: string;
}

export class OrderUpdateDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsNumber()
  passengers?: number;

  @IsOptional()
  @IsNumber()
  cargo?: number;

  @IsOptional()
  @ValidateNested()
  departureCity?: UpdateRoutePoint;

  @IsOptional()
  @ValidateNested()
  destination?: UpdateRoutePoint;
}