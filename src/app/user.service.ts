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

  sendEmail(userId: number) {
    const activateUrl = `${this.baseUrl}/send-email/${userId}`;
    return this._httpClient.post<User>(activateUrl, {});
  }

  activateUser(userId: number, link: string) {
    const activateUrl = `${this.baseUrl}/activate/${userId}`;
    return this._httpClient.post<User>(activateUrl, {link});
  }

  logoutUser(userId: number) {
    const logoutUrl = `${this.baseUrl}/logout/${userId}`;
    return this._httpClient.post<User>(logoutUrl, {});
  }
}
