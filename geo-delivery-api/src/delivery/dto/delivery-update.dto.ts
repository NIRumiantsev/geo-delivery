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

export class DeliveryUpdateDto {
  @IsOptional()
  @IsString()
  moverId?: string;

  @IsOptional()
  @IsString()
  autoId?: string;

  @IsOptional()
  @IsNumber()
  passengersLeft?: number;

  @IsOptional()
  @IsNumber()
  cargoLeft?: number;

  @IsOptional()
  @ValidateNested()
  departureCity?: UpdateRoutePoint;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  waypoints?: UpdateRoutePoint[];

  @IsOptional()
  @ValidateNested()
  destination?: UpdateRoutePoint;
}