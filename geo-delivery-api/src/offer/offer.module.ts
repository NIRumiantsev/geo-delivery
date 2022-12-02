import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { OfferModel } from './offer.model';
import { UserService } from '../user/user.service';
import { OrderService } from '../order/order.service';
import { DeliveryService } from '../delivery/delivery.service';
import { NotificationService } from '../notification/notification.service';

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
    UserService,
    OrderService,
    DeliveryService,
    NotificationService,
  ],
  providers: [OfferService]
})
export class OfferModule {}
