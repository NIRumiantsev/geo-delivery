import { inject, injectable } from 'inversify';
import { OrderDto, OrderSearchParams } from 'types';
import { identifiers } from 'core';
import { ApiService, UserService } from 'core/services';
import { OrderStore, orderStore } from 'core/stores';
import {
  ORDER_URL,
  ORDER_ID_URL,
  ORDER_TOTAL_URL,
  ORDER_SEARCH_URL
} from './urls';

@injectable()
export class OrderService {

  private readonly orderStore: OrderStore

  constructor(
    @inject(identifiers.API_SERVICE) private readonly apiService: ApiService,
    @inject(identifiers.USER_SERVICE) private readonly userService: UserService
  ) {
    this.orderStore = orderStore;
  }

  async searchOrders(params: OrderSearchParams) {
    this.orderStore.orderList = await this.apiService.get(ORDER_SEARCH_URL(params));
  }

  async getTotalOrders() {
    this.orderStore.totalOrders = await this.apiService.get(ORDER_TOTAL_URL);
  }

  async loadOrderById(orderId: string) {
    this.orderStore.selectedOrder = await this.apiService.get(ORDER_ID_URL(orderId));
    if (this.orderStore.selectedOrder) {
      await this.loadOrderCustomer(this.orderStore.selectedOrder.userId);
    }
  }

  async loadOrderCustomer(customerId: string) {
    this.orderStore.selectedOrderCustomer = await this.userService.getUserById(customerId);
  }

  async createOrder(dto: OrderDto) {
    await this.apiService.post(ORDER_URL, dto);
  }
}