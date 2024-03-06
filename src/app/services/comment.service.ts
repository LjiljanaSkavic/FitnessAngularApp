import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommentRequest } from "../models/dto/CommentRequest";
import { Comment } from "../models/Comment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    baseUrl = "http://localhost:9000/comments";

    constructor(private _httpClient: HttpClient) {
    }

    createComment(commentRequest: CommentRequest): Observable<Comment> {
        return this._httpClient.post<Comment>(this.baseUrl, commentRequest);
    }

    deleteById(id: number): Observable<any> {
        return this._httpClient.post<any>(`${this.baseUrl}/${id}`, {});
    }
}
