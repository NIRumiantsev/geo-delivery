import { inject, injectable } from 'inversify';
import { DeliveryDto, DeliverySearchParams } from 'types';
import { identifiers } from 'core';
import { ApiService, AutoService, UserService } from 'core/services';
import { DeliveryStore, deliveryStore } from 'core/stores';
import {
  DELIVERY_URL,
  DELIVERY_ID_URL,
  DELIVERY_TOTAL_URL,
  DELIVERY_SEARCH_URL
} from './urls';

@injectable()
export class DeliveryService {

  private readonly deliveryStore: DeliveryStore

  constructor(
    @inject(identifiers.API_SERVICE) private readonly apiService: ApiService,
    @inject(identifiers.USER_SERVICE) private readonly userService: UserService,
    @inject(identifiers.AUTO_SERVICE) private  readonly autoService: AutoService,
  ) {
    this.deliveryStore = deliveryStore;
  }

  async searchDeliveries(params: DeliverySearchParams) {
    this.deliveryStore.deliveryList = await this.apiService.get(DELIVERY_SEARCH_URL(params));
  }

  async getTotalDeliveries() {
    this.deliveryStore.totalDeliveries = await this.apiService.get(DELIVERY_TOTAL_URL);
  }

  async loadDeliveryById(deliveryId: string) {
    this.deliveryStore.selectedDelivery = await this.apiService.get(DELIVERY_ID_URL(deliveryId));
    if (this.deliveryStore.selectedDelivery) {
      await this.loadMoverById(this.deliveryStore.selectedDelivery.moverId);
      await this.loadDeliveryAuto(this.deliveryStore.selectedDelivery.autoId);
    }
  }

  async loadMoverById(moverId: string) {
    this.deliveryStore.selectedDeliveryMover = await this.userService.getUserById(moverId);
  }

  async loadDeliveryAuto(autoId: string) {
    this.deliveryStore.selectedDeliveryAuto = await this.autoService.getAutoById(autoId);
  }

  async createDelivery(dto: DeliveryDto) {
    await this.apiService.post(DELIVERY_URL, dto);
  }
}