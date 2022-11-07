import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PlaceQueryParams, PlacesAutocompleteResponse } from './types';

@Injectable()
export class SearchService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async searchCities(query: PlaceQueryParams): Promise<PlacesAutocompleteResponse> {
    const api = this.configService.get('GOOGLE_MAPS_API');
    const key = this.configService.get('GOOGLE_MAPS_API_KEY');
    const params = new URLSearchParams({ ...query, key, types: 'locality' }).toString();
    const { data } = await this.httpService.axiosRef.get<PlacesAutocompleteResponse>(`${api}/place/autocomplete/json?${params}`);
    return data;
  }
}
