import { makeAutoObservable } from 'mobx';
import { AutoDto } from 'types';

class AutoStore {
  private _autoList: AutoDto[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  set autoList(list: AutoDto[]) {
    this._autoList = list;
  }

  get autoList() {
    return this._autoList
  }
}

const autoStore = new AutoStore();

export { AutoStore, autoStore };