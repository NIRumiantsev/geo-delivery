import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { OfferModel } from './offer.model';
import { UserService } from '../user/user.service';
import { OrderService } from '../order/order.service';
import { DeliveryService } from '../delivery/delivery.service';
import { NotificationService } from '../notification/notification.service';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';
import { DeliveryModule } from '../delivery/delivery.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [OfferController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: OfferModel,
        schemaOptions: {
          collection: 'Offer'
        }
      }
    ]),
    UserModule,
    OrderModule,
    DeliveryModule,
    NotificationModule,
  ],
  providers: [OfferService]
})
export class OfferModule {}
