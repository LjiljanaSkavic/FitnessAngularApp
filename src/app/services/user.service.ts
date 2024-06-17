import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AppUser, AppUserShortWithUnreadMessages } from "../models/app-user";
import { Observable } from "rxjs";
import { UserDto } from "../models/dto/user-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: AppUser = null;
  baseUrl = "http://localhost:9000/users";

  constructor(private _httpClient: HttpClient) {
  }

  findUserByUsernameAndPassword(username: any, password: string): Observable<AppUser> {
    const loginUserInfo = {
      username: username,
      password: password
    }

    const loginUrl = `${this.baseUrl}/login`;
    return this._httpClient.post<AppUser>(loginUrl, loginUserInfo);
  }

  getActiveUsers(userId: number): Observable<AppUserShortWithUnreadMessages[]> {
    const url = `${this.baseUrl}/activated`;
    const params = new HttpParams().set('userId', userId.toString());
    return this._httpClient.get<AppUserShortWithUnreadMessages[]>(url, {params});
  }

  subscribeToCategory(userId: number, categoryId: number): Observable<any> {
    const url = `${this.baseUrl}/subscribe`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {userId, categoryId};

    return this._httpClient.post(url, null, {headers, params: body});
  }

  sendEmail(userId: number): Observable<string> {
    const activateUrl = `${this.baseUrl}/send-email/${userId}`;
    return this._httpClient.post(activateUrl, {}, {responseType: "text"});
  }

  activateUser(userId: number, link: string) {
    const activateUrl = `${this.baseUrl}/activate/${userId}`;
    return this._httpClient.post<AppUser>(activateUrl, link);
  }

  editUser(user: UserDto): Observable<AppUser> {
    const editUserUrl = `${this.baseUrl}/${user.id}`;
    return this._httpClient.put<AppUser>(editUserUrl, user);
  }

  logoutUser(userId: number) {
    const logoutUrl = `${this.baseUrl}/logout/${userId}`;
    return this._httpClient.post<AppUser>(logoutUrl, {});
  }

  createUser(user: UserDto) {
    return this._httpClient.post<AppUser>(this.baseUrl, user);
  }

  changePassword(userId: number, currentPassword: string, newPassword: string) {
    const changePasswordUrl = `${this.baseUrl}/change-password/${userId}`;
    const changePasswordData = {
      currentPassword: currentPassword,
      newPassword: newPassword
    }
    return this._httpClient.post(changePasswordUrl, changePasswordData)
  }
}
