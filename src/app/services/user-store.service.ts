import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { LocalStoreService } from "./local-store.service";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private _isLoggedIn = false;
  isLoggedIn$ = new BehaviorSubject(false);

  constructor(private _localStoreService: LocalStoreService) {
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  setUserAsLoggedIn(user: User) {
    this._localStoreService.saveData('loggedUser', JSON.stringify(user));
    this._isLoggedIn = true;
  }

  setUserAsLoggedOut() {
    this._localStoreService.removeData('loggedUser');
    this._isLoggedIn = false;
  }

  getLoggedInUser(): User | null {
    const userString = this._localStoreService.getData('loggedUser');
    if (userString !== null) {
      const user: User = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }
}
