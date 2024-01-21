import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private rssFeedUrl = 'https://feeds.feedburner.com/AceFitFacts';

  constructor(private _httpClient: HttpClient) {
  }

  getRssFeed(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text',
    });
    return this._httpClient.get(this.rssFeedUrl, {headers});
    // return this._httpClient.get(this.rssFeedUrl, {responseType: 'text'}).pipe(
    //   map((data: string) => {
    //     const parser = new DOMParser();
    //     const xmlDoc = parser.parseFromString(data, 'text/xml');
    //     const items = Array.from(xmlDoc.querySelectorAll('item'));
    //
    //     return items.map((item) => ({
    //       title: item.querySelector('title')?.textContent,
    //       category: item.querySelector('category')?.textContent,
    //       link: item.querySelector('link')?.textContent,
    //       description: item.querySelector('description')?.textContent,
    //     }));
    //   })
    // );
  }
}
