import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ChatMessage } from "../models/dto/ChatMessage";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ChatMessageService {
    baseUrl = "http://localhost:9000/messages";

    constructor(private _httpClient: HttpClient) {
    }

    getUnreadMessagesByUserId(userId: number): Observable<ChatMessage[]> {
        return this._httpClient.get<ChatMessage[]>(`${this.baseUrl}/unread/${userId}`);
    }
}
