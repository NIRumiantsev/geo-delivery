import { HttpModule, Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SearchController],
  imports: [ConfigModule, HttpModule],
  providers: [SearchService]
})
export class SearchModule {}
