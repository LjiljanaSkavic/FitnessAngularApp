import { Component, Input } from '@angular/core';
import { RssFeedItem } from "../../../models/Rss-feed";

@Component({
    selector: 'app-rss-feed-news-item',
    templateUrl: './rss-feed-news-item.component.html',
    styleUrls: ['./rss-feed-news-item.component.scss']
})
export class RssFeedNewsItemComponent {

    @Input() rssFeedNewsItem: RssFeedItem;

}
