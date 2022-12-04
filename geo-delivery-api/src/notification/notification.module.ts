import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationModel } from './notification.model';

@Module({
  providers: [NotificationService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: NotificationModel,
        schemaOptions: {
          collection: 'Notification'
        }
      }
    ])
  ],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
