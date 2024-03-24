import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { FeedService } from "../../services/feed.service";
import { RssFeedItem } from "../../models/Rss-feed";

@Component({
    selector: 'app-rss-feed-news-list',
    templateUrl: './rss-feed-news-list.component.html',
    styleUrls: ['./rss-feed-news-list.component.scss']
})
export class RssFeedNewsListComponent implements OnInit, OnDestroy {

    rssFeedNews: RssFeedItem[] = [];
    isLoading = true;
    subscription = new Subscription();

    constructor(private _rssFeed: FeedService) {
    }

    ngOnInit(): void {
        this.subscription.add(this._rssFeed.getRssFeedNews().subscribe(res => {
            this.rssFeedNews = res;
            this.isLoading = false;
        }));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
