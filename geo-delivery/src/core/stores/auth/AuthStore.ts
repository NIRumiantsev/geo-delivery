import { makeAutoObservable } from 'mobx';

class AuthStore {
  private _token: string = '';

  constructor() {
    makeAutoObservable(this)
  }

  set token (token: string) {
    this._token = token;
  }

  get token (): string {
    return this._token;
  }
}

const authStore = new AuthStore();

export { AuthStore, authStore };

