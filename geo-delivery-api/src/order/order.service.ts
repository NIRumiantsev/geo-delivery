import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { FilterQuery } from 'mongoose';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { OrderModel } from './order.model';
import { OrderSearchParams } from './types';
import { OrderDto, OrderUpdateDto } from './dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>) {}

  async create(dto: OrderDto): Promise<DocumentType<OrderModel>> {
    // @ts-ignore
    return this.orderModel.create(dto);
  }

  async update(id: string, dto: OrderUpdateDto) {
    return this.orderModel.findByIdAndUpdate(id, dto).exec();
  }

  async delete(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async get(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async getTotal() {
    return this.orderModel.count({}).exec();
  }

  async findByParams(params: OrderSearchParams) {
    const {
      departureCity,
      destinationCity,
      cargoVolume,
      passengers,
      pageNumber = 0,
      perPage = 100,
    } = params;

    const query: FilterQuery<OrderModel> =  {};

    if (passengers) {
      query.passengersLeft = { $gte: Number(passengers) }
    }
    if (cargoVolume) {
      query.cargoLeft = { $gte: Number(cargoVolume) }
    }
    if (departureCity) {
      query["departureCity.city"] = departureCity
    }
    if (destinationCity) {
      query.$or = [{ "destination.city": destinationCity}, { waypoints: { $elemMatch: { "city": destinationCity } } }]
    }

    return this.orderModel
      .find( query)
      .skip( Number(pageNumber) > 0 ? ( ( Number(pageNumber) ) * Number(perPage) ) : 0 )
      .limit( Number(perPage) )
      .exec()
  }
}
