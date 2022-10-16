import { Module } from '@nestjs/common';
import { AutoService } from './auto.service';
import { AutoController } from './auto.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { AutoModel } from './auto.model';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AutoService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AutoModel,
        schemaOptions: {
          collection: 'Auto'
        }
      }
    ]),
    UserModule
  ],
  controllers: [AutoController]
})
export class AutoModule {}
