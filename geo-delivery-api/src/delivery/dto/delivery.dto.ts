import { IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';

class RoutePoint {
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  departure?: string;

  @IsOptional()
  @IsString()
  arrive?: string;
}

export class DeliveryDto {
  @IsString()
  moverId: string;

  @IsString()
  autoId: string;

  @IsOptional()
  @IsNumber()
  passengersLeft?: number;

  @IsOptional()
  @IsNumber()
  cargoLeft?: number;

  @ValidateNested()
  departureCity: RoutePoint;

  @IsArray()
  @ValidateNested()
  waypoints: RoutePoint[];

  @ValidateNested()
  destination: RoutePoint;
}