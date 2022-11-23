import { makeAutoObservable } from 'mobx';
import { OrderDto, UserDto } from 'types';

class OrderStore {
  private _orderList: OrderDto[] = [];
  private _totalOrders: number = 0;
  private _selectedOrder: OrderDto | null = null;
  private _selectedOrderCustomer: UserDto | null = null;

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

  get selectedOrder() {
    return this._selectedOrder;
  }

  set selectedOrder(order) {
    this._selectedOrder = order;
  }

  get selectedOrderCustomer() {
    return this._selectedOrderCustomer;
  }

  set selectedOrderCustomer(customer) {
    this._selectedOrderCustomer = customer;
  }
}

const orderStore = new OrderStore();

export { OrderStore, orderStore };