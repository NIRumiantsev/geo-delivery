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

export class OrderDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsNumber()
  passengers?: number;

  @IsOptional()
  @IsNumber()
  cargo?: number;

  @ValidateNested()
  departureCity: RoutePoint;

  @ValidateNested()
  destination: RoutePoint;
}