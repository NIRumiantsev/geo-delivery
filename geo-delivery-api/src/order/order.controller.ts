import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DELIVERY_NOT_FOUND_ERROR } from '../delivery/delivery.constants';
import { OrderUpdateDto, OrderDto } from './dto';
import { OrderSearchParams } from './types';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: OrderDto) {
    return this.orderService.create(dto);
  }

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Put('id/:deliveryId')
  async update(@Param('deliveryId') deliveryId: string, @Body() dto: OrderUpdateDto) {
    const updatedDelivery = await this.orderService.update(deliveryId, dto);
    if (!updatedDelivery) {
      throw new NotFoundException(DELIVERY_NOT_FOUND_ERROR);
    }
    return updatedDelivery;
  }

  @UseGuards(JwtGuard)
  @Delete('id/:deliveryId')
  async delete(@Param('deliveryId') deliveryId: string) {
    const deletedDelivery = await this.orderService.delete(deliveryId);
    if (!deletedDelivery) {
      throw new NotFoundException(DELIVERY_NOT_FOUND_ERROR);
    }
  }

  @Get('id/:deliveryId')
  @HttpCode(200)
  async get(@Param('deliveryId') deliveryId: string) {
    const delivery = await this.orderService.get(deliveryId);
    if (!delivery) {
      throw new NotFoundException(DELIVERY_NOT_FOUND_ERROR);
    }
    return delivery;
  }

  @Get()
  @HttpCode(200)
  async findByParams(@Query() query: OrderSearchParams) {
    return this.orderService.findByParams(query);
  }


  @Get('total')
  @HttpCode(200)
  async getTotal() {
    return this.orderService.getTotal();
  }
}
