import { Injectable } from '@angular/core';
import { AdviceMessage } from "../models/AdviceMessage";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdviceMessageService {
  baseUrl = "http://localhost:9000/advice-message";

  constructor(private _httpClient: HttpClient) {
  }

  sendMessage(message: AdviceMessage): Observable<any> {
    return this._httpClient.post<AdviceMessage>(this.baseUrl, message);
  }
}
