import { inject, injectable } from 'inversify';
import { identifiers } from 'core';
import { ApiService } from 'core/services';
import { SearchStore, searchStore } from 'core/stores';
import { PlacesAutocompleteResponse, PlacesAutocompleteStatuses } from 'types';
import { SEARCH_CITY_URL } from './urls';

@injectable()
export class SearchService {

  private readonly searchStore: SearchStore

  constructor(@inject(identifiers.API_SERVICE) private readonly apiService: ApiService ) {
    this.searchStore = searchStore;
  }

  async searchCities(input: string) {
    const { status, predictions } = await this.apiService.get<PlacesAutocompleteResponse>(SEARCH_CITY_URL(input));
    if (status === PlacesAutocompleteStatuses.OK) {
      this.searchStore.citiesSearchList = predictions;
    } else {
      this.searchStore.citiesSearchList = [];
    }
  };
}