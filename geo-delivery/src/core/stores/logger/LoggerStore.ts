import { makeAutoObservable } from 'mobx';
import { LoggerItem } from 'types';

class LoggerStore {
  private _loggerQueue: LoggerItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  set loggerQueue(items: LoggerItem[]) {
    this._loggerQueue = items;
  }

  get loggerQueue(): LoggerItem[] {
    return this._loggerQueue;
  }
}

const loggerStore = new LoggerStore();

export { LoggerStore, loggerStore }