import { FeedItem } from '../_interface/feed-item.model'

export interface PeopleDebateItem {
    id: number,
    ownerId: number,
    details: string;
    title: string;
    imageUrl: string,
    videoUrl: string,
    hashTags: string
  }