import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ChatModule } from './chat/chat.module';
import { getMongoConfig } from './configs';
import { AutoModule } from './auto/auto.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule,
    UserModule,
    OrderModule,
    DeliveryModule,
    ChatModule,
    AutoModule,
    SearchModule
  ],
})
export class AppModule {}
