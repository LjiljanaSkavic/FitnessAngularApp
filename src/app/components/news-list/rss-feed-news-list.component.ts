import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { FeedService } from "../../services/feed.service";
import { RssFeedItem } from "../../models/rss-feed";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-rss-feed-news-list',
  templateUrl: './rss-feed-news-list.component.html',
  styleUrls: ['./rss-feed-news-list.component.scss']
})
export class RssFeedNewsListComponent implements OnInit, OnDestroy {

  rssFeedNews: RssFeedItem[] = [];
  pagedRssFeedNews: RssFeedItem[] = [];
  isLoading = true;
  pageSizeOptions: any;
  pageSize = 5;
  subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _rssFeed: FeedService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this._rssFeed.getRssFeedNews().subscribe(res => {
      this.rssFeedNews = res;
      this.displayPage(0);
      this.isLoading = false;
    }));
  }

  onPageChange(event: any): void {
    this.displayPage(event.pageIndex);
  }

  displayPage(currentPageIndex: number): void {
    const startIndex = currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedRssFeedNews = this.rssFeedNews.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
