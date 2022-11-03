import { injectable } from 'inversify';

@injectable()
export class StorageService {

  setLocalItem(name: string, value: string) {
    window.localStorage.setItem(name, value);
  }

  getLocalItem<T>(name: string): T {
    return window.localStorage.getItem(name) as T;
  }

  deleteLocalItem(name: string) {
    window.localStorage.removeItem(name);
  }

  clearLocal() {
    window.localStorage.clear();
  }

  setCookieItem(name: string, value: string) {
    const cookieData = JSON.parse(document.cookie || '{}');
    cookieData[name] = value;
    document.cookie = JSON.stringify(cookieData);
  }

  getCookieItem(name: string) {
    const cookieData = JSON.parse(document.cookie || '{}');
    return cookieData[name];
  }

  deleteCookieItem(name: string) {
    const cookieData = JSON.parse(document.cookie || '{}');
    delete cookieData[name];
    document.cookie = cookieData;
  }

  clearCookie() {
    document.cookie = '{}';
  }
}