import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChatMessage } from "../models/dto/ChatMessage";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = "http://localhost:9000/chat";

  constructor(private _httpClient: HttpClient) {
  }

  getChatId(userId: number, id: number): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/${userId}/${id}`);
  }

  retrieveAndMarkMessagesAsRead(chatId: number, userId: number): Observable<ChatMessage[]> {
    const url = `${this.baseUrl}/${chatId}/messages/read`;
    const params = new HttpParams().set('userId', userId.toString());
    return this._httpClient.post<ChatMessage[]>(url, null, {params});
  }

  sendMessage(chatId: number, chatMessage: ChatMessage): Observable<ChatMessage> {
    return this._httpClient.post<ChatMessage>(`${this.baseUrl}/${chatId}/send`, chatMessage);
  }
}
