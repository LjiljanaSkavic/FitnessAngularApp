import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FeedService {

    private rssNewsUrl = 'http://localhost:9000/rss-feed-news';

    constructor(private _httpClient: HttpClient) {
    }

    getRssFeedNews(): Observable<any> {
        return this._httpClient.get(this.rssNewsUrl);
    }
}
