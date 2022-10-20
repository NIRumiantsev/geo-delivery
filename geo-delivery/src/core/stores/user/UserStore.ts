import { makeAutoObservable } from 'mobx';
import { UserDto } from 'types';

class UserStore {
  private _user: UserDto | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  set user(user: UserDto | null) {
    this._user = user;
  }

  get user(): UserDto | null {
    return this._user;
  }
}

const userStore = new UserStore()

export { UserStore, userStore };