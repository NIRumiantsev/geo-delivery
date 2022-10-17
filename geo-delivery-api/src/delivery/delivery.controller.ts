import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  Get,
  UseGuards,
  UsePipes,
  HttpCode,
  Query,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { DeliveryDto, DeliveryUpdateDto } from './dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DeliveryService } from './delivery.service';
import { DELIVERY_NOT_FOUND_ERROR } from './delivery.constants';
import { DeliverySearchParams } from './types';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: DeliveryDto) {
    return this.deliveryService.create(dto);
  }

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Put(':deliveryId')
  async update(@Param('deliveryId') deliveryId: string, @Body() dto: DeliveryUpdateDto) {
    const updatedDelivery = await this.deliveryService.update(deliveryId, dto);
    if (!updatedDelivery) {
      throw new NotFoundException(DELIVERY_NOT_FOUND_ERROR);
    }
    return updatedDelivery;
  }

  @UseGuards(JwtGuard)
  @Delete(':deliveryId')
  async delete(@Param('deliveryId') deliveryId: string) {
    const deletedDelivery = await this.deliveryService.delete(deliveryId);
    if (!deletedDelivery) {
      throw new NotFoundException(DELIVERY_NOT_FOUND_ERROR);
    }
  }

  @Get(':deliveryId')
  @HttpCode(200)
  async get(@Param('deliveryId') deliveryId: string) {
    const delivery = await this.deliveryService.get(deliveryId);
    if (!delivery) {
      throw new NotFoundException(DELIVERY_NOT_FOUND_ERROR);
    }
    return delivery;
  }

  @Get()
  @HttpCode(200)
  async findByParams(@Query() query: DeliverySearchParams) {
    return this.deliveryService.findByParams(query);
  }
}
