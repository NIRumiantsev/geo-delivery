import { injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { LoggerStore, loggerStore } from 'core/stores';
import { LoggerItem } from 'types';

@injectable()
export class LoggerService {

  private readonly loggerStore: LoggerStore

  constructor() {
    this.loggerStore = loggerStore;
  }

  private addLoggerItem(newItem: LoggerItem) {
    this.loggerStore.loggerQueue = [...this.loggerStore.loggerQueue, newItem];
  }

  removeLoggerItem(itemId: string) {
    const itemIndex = this.loggerStore.loggerQueue.findIndex((item) => item.id === itemId);
    const newQueue = [...this.loggerStore.loggerQueue];
    newQueue.splice(itemIndex, 1);
    this.loggerStore.loggerQueue = newQueue;
  }

  error(text: string) {
    const newItem: LoggerItem = {
      id: uuid(),
      text,
      status: 'error',
    }
    this.addLoggerItem(newItem);
    console.error(text);
  }

  warning(text: string) {
    const newItem: LoggerItem = {
      id: uuid(),
      text,
      status: 'warning',
    }
    this.addLoggerItem(newItem);
    console.warn(text);
  }

  info(text: string) {
    const newItem: LoggerItem = {
      id: uuid(),
      text,
      status: 'info',
    }
    this.addLoggerItem(newItem);
  }

  success(text: string) {
    const newItem: LoggerItem = {
      id: uuid(),
      text,
      status: 'success',
    }
    this.addLoggerItem(newItem);
  }
}