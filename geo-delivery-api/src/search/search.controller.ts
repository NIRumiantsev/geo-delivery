import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { PlaceQueryParams } from './types';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('cities')
  @HttpCode(200)
  async searchCities(@Query() query: PlaceQueryParams) {
    return await this.searchService.searchCities(query);
  }
}
