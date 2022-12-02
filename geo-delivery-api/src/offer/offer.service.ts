import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { OfferModel } from './offer.model';
import { OfferCreateDto } from './dto';
import { OfferSearchParams } from './types';

@Injectable()
export class OfferService {
  constructor(@InjectModel(OfferModel) private readonly offerModel: ModelType<OfferModel>) {}

  async create(dto: OfferCreateDto): Promise<DocumentType<OfferModel>> {
    // @ts-ignore
    return this.offerModel.create(dto);
  }

  async get(id: string): Promise<DocumentType<OfferModel>> {
    return this.offerModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.offerModel.findByIdAndDelete(id).exec();
  }

  async accept(id: string): Promise<DocumentType<OfferModel>> {
    return this.offerModel.findByIdAndUpdate(id, { accepted: true }).exec();
  }

  async decline(id: string): Promise<DocumentType<OfferModel>> {
    return this.offerModel.findByIdAndUpdate(id, { accepted: false }).exec();
  }

  async find(params: OfferSearchParams): Promise<DocumentType<OfferModel>[]> {
    return this.offerModel.find(params).exec();
  }
}
