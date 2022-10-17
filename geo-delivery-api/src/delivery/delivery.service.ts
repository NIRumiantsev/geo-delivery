import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { DeliveryModel } from './delivery.model';
import { DeliveryDto, DeliveryUpdateDto } from './dto';
import { DeliverySearchParams } from './types';
import { DocumentQuery, FilterQuery } from 'mongoose';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(DeliveryModel) private readonly deliveryModel: ModelType<DeliveryModel>) {}

  async create(dto: DeliveryDto): Promise<DocumentType<DeliveryModel>> {
    // @ts-ignore
    return this.deliveryModel.create(dto);
  }

  async update(id: string, dto: DeliveryUpdateDto) {
    return this.deliveryModel.findByIdAndUpdate(id, dto).exec();
  }

  async delete(id: string) {
    return this.deliveryModel.findByIdAndDelete(id).exec();
  }

  async get(id: string) {
    return this.deliveryModel.findById(id).exec();
  }

  async findByParams(params: DeliverySearchParams) {
    const {
      moverId,
      departureCity,
      destinationCity,
      cargoVolume,
      passengers,
      pageNumber = 0,
      perPage = 100,
    } = params;

    const query: FilterQuery<DeliveryModel> = moverId ? { moverId } : {};

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

    return this.deliveryModel
      .find( query)
      .skip( Number(pageNumber) > 0 ? ( ( Number(pageNumber) ) * Number(perPage) ) : 0 )
      .limit( Number(perPage) )
      .exec()
  }
}


