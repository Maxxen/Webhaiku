export interface RedditResponse {
  kind: RedditKind;
  data: {
    modhash: string;
    dist: number;
    children: RedditPost[];
  }
}

export type RedditKind = "Listing" | "t1" | "t2" | "t3" | "t4" | "t5" | "t6";

export interface RedditPost {
  kind: RedditKind;
  data: RedditLink;
}

export interface RedditLink {
  author: string;
  author_flair_text: string | null;
  clicked: boolean;
  domain: string;
  hidden: boolean;
  is_self: boolean;
  likes: boolean;
  link_flair_text: string | null;
  locked: boolean;
  media: RedditMedia;
  media_embed: RedditMediaEmbed;
  num_comments: number;
  over_18: boolean;
  permalink: string;
  saved: boolean;
  score: number;
  selftext: string;
  selftext_html: string;
  subreddit: string;
  subreddit_id: string;
  thumbnail: "self" | "image" | "default" | string;
  title: string;
  url: string;
  edited: false | number;
  distinguished: null | "moderator" | "admin" | "special";
  stickied: boolean;
}

export interface RedditMedia {
  type: "youtube.com" | string;
  oembed: {
    provider_url: string;
    version: number;
    title: string;
    type:	"video" | string;
    thumbnail_width: number;
    height:	number;
    width: number;
    html: string;
    author_name: string;
    provider_name: "YouTube";
    thumbnail_url: string;
    thumbnail_height: number;
    author_url: string;
  }
}

export type RedditMediaEmbed = any;