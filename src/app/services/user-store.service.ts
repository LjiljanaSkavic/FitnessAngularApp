import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { LocalStoreService } from "./local-store.service";
import { AppUser } from "../models/AppUser";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  isLoggedIn$ = new Subject<boolean>();
  private _isLoggedIn = false;

  constructor(private _localStoreService: LocalStoreService) {
  }

  getIsLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  setUserAsLoggedIn(user: AppUser): void {
    this._localStoreService.saveData('loggedUser', JSON.stringify(user));
    this._isLoggedIn = true;
  }

  setUserAsLoggedOut(): void {
    this._localStoreService.removeData('loggedUser');
    this._isLoggedIn = false;
  }

  getLoggedInUser(): AppUser | null {
    const userString = this._localStoreService.getData('loggedUser');
    console.log('string', userString);
    if (userString !== null) {
      const user: AppUser = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }
}
