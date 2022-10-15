import { Module, Global } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.model';

@Global()
@Module({
  controllers: [UserController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User'
        }
      }
    ])
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
