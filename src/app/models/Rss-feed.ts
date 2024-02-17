export interface RssFeed {
  title: string;
  link: string;
  image: string;
  description: string;
  copyright: string;
  items: RssItem[];
}

export interface RssItem {
  category: string;
  title: string;
  description: string;
  link: string;
}
