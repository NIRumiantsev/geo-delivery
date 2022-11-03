import { makeAutoObservable } from 'mobx';
import { OrderDto } from 'types';

class OrderStore {
  private _orderList: OrderDto[] = [];
  private _totalOrders: number = 0;

  constructor() {
    makeAutoObservable(this)
  }

  get orderList() {
    return this._orderList;
  }

  set orderList(list) {
    this._orderList = list;
  }

  get totalOrders() {
    return this._totalOrders;
  }

  set totalOrders(total) {
    this._totalOrders = total;
  }
}

const orderStore = new OrderStore();

export { OrderStore, orderStore };