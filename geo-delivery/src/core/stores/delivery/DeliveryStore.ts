import { makeAutoObservable } from 'mobx';
import { DeliveryDto } from 'types';

class DeliveryStore {
  private _deliveryList: DeliveryDto[] = [];
  private _totalDeliveries: number = 0;

  constructor() {
    makeAutoObservable(this)
  }

  get deliveryList() {
    return this._deliveryList;
  }

  set deliveryList(list) {
    this._deliveryList = list;
  }

  get totalDeliveries() {
    return this._totalDeliveries;
  }

  set totalDeliveries(total) {
    this._totalDeliveries = total;
  }
}

const deliveryStore = new DeliveryStore();

export { DeliveryStore, deliveryStore };