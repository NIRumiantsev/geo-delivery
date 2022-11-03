import { inject, injectable } from 'inversify';
import { DeliverySearchParams } from 'types';
import { identifiers } from 'core';
import { ApiService } from 'core/services';
import { DeliveryStore, deliveryStore } from 'core/stores';
import { DELIVERY_TOTAL_URL, DELIVERY_SEARCH_URL } from './urls';

@injectable()
export class DeliveryService {

  private readonly deliveryStore: DeliveryStore

  constructor(@inject(identifiers.API_SERVICE) private readonly apiService: ApiService) {
    this.deliveryStore = deliveryStore;
  }

  async searchDeliveries(params: DeliverySearchParams) {
    this.deliveryStore.deliveryList = await this.apiService.get(DELIVERY_SEARCH_URL(params));
  }

  async getTotalDeliveries() {
    this.deliveryStore.totalDeliveries = await this.apiService.get(DELIVERY_TOTAL_URL);
  }
}