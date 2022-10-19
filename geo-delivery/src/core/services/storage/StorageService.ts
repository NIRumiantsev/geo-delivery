import { injectable } from 'inversify';

@injectable()
export class StorageService {

  setItem(name: string, value: string) {
    window.localStorage.setItem(name, value);
  }

  getItem(name: string) {
    window.localStorage.getItem(name);
  }

  deleteItem(name: string) {
    window.localStorage.removeItem(name);
  }

  clear() {
    window.localStorage.clear();
  }
}