import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { AutoModel } from './auto.model';
import { AutoDto } from './dto';

@Injectable()
export class AutoService {
  constructor(@InjectModel(AutoModel) private readonly autoModel: ModelType<AutoModel>) {}

  async createAuto(autoList: AutoDto[]) {
    return this.autoModel.insertMany(autoList);
  }
}