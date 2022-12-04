import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrderModel } from './order.model';

@Module({
  controllers: [OrderController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: OrderModel,
        schemaOptions: {
          collection: 'Order'
        }
      }
    ])
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
