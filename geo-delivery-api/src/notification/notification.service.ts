import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { NotificationModel } from './notification.model';
import { NotificationCreateDto } from './dto';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(NotificationModel) private readonly notificationModel: ModelType<NotificationModel>) {}

  async create(dto: NotificationCreateDto): Promise<DocumentType<NotificationModel>> {
    // @ts-ignore
    return this.notificationModel.create(dto);
  }

  async getAllByUserId(userId: string): Promise<DocumentType<NotificationModel>[]> {
    return this.notificationModel.find({ userId }).exec();
  }

  async delete(id: string) {
    return this.notificationModel.findByIdAndDelete(id).exec();
  }

  async deleteAllByUserId(userId: string) {
    return this.notificationModel.deleteMany({ userId }).exec();
  }
}
