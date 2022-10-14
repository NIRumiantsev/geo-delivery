import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, UserModule, OrderModule, DeliveryModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
