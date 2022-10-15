import { Module } from '@nestjs/common';
import { AutoService } from './auto.service';
import { AutoController } from './auto.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { AutoModel } from './auto.model';

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
    ])
  ],
  controllers: [AutoController]
})
export class AutoModule {}
