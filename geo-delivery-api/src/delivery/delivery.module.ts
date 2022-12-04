import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { DeliveryModel } from './delivery.model';

@Module({
  controllers: [DeliveryController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: DeliveryModel,
        schemaOptions: {
          collection: 'Delivery'
        }
      }
    ])
  ],
  providers: [DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
