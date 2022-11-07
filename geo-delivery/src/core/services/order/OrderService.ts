import { inject, injectable } from 'inversify';
import { OrderDto, OrderSearchParams } from 'types';
import { identifiers } from 'core';
import { ApiService } from 'core/services';
import { OrderStore, orderStore } from 'core/stores';
import { ORDER_URL, ORDER_TOTAL_URL, ORDER_SEARCH_URL } from './urls';

@injectable()
export class OrderService {

  private readonly orderStore: OrderStore

  constructor(@inject(identifiers.API_SERVICE) private readonly apiService: ApiService) {
    this.orderStore = orderStore;
  }

  async searchOrders(params: OrderSearchParams) {
    this.orderStore.orderList = await this.apiService.get(ORDER_SEARCH_URL(params));
  }

  async getTotalOrders() {
    this.orderStore.totalOrders = await this.apiService.get(ORDER_TOTAL_URL);
  }

  async createOrder(dto: OrderDto) {
    await this.apiService.post(ORDER_URL, dto);
  }
}