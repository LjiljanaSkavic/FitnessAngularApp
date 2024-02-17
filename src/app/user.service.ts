import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "./models/User";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: User = null;
  baseUrl = "http://localhost:9000/users";

  constructor(private _httpClient: HttpClient) {
  }

  findUserByUsernameAndPassword(username: any, password: string): Observable<User> {
    const loginUserInfo = {
      username: username,
      password: password
    }
    const loginUrl = `${this.baseUrl}/login`;
    return this._httpClient.post<User>(loginUrl, loginUserInfo);
  }
}
