import { makeAutoObservable } from 'mobx';
import { DeliveryDto, UserDto, AutoDto } from 'types';

class DeliveryStore {
  private _deliveryList: DeliveryDto[] = [];
  private _totalDeliveries: number = 0;
  private _selectedDelivery: DeliveryDto | null = null;
  private _selectedDeliveryMover: UserDto | null = null;
  private _selectedDeliveryAuto: AutoDto | null = null;

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

  get selectedDelivery() {
    return this._selectedDelivery;
  }

  set selectedDelivery(delivery) {
    this._selectedDelivery = delivery;
  }

  get selectedDeliveryMover() {
    return this._selectedDeliveryMover;
  }

  set selectedDeliveryMover(mover) {
    this._selectedDeliveryMover = mover;
  }

  get selectedDeliveryAuto() {
    return this._selectedDeliveryAuto;
  }

  set selectedDeliveryAuto(auto) {
    this._selectedDeliveryAuto = auto;
  }
}

const deliveryStore = new DeliveryStore();

export { DeliveryStore, deliveryStore };