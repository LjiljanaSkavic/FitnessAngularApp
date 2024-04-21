import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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

    getChatMessages(chatId: number): Observable<ChatMessage[]> {
        return this._httpClient.get<ChatMessage[]>(`${this.baseUrl}/${chatId}/messages`);
    }

    sendMessage(chatId: number, chatMessage: ChatMessage): Observable<ChatMessage> {
        return this._httpClient.post<ChatMessage>(`${this.baseUrl}/${chatId}/send`, chatMessage);
    }
}
