import type { CollectionEntry } from 'astro:content';

export enum FeedItemType {
  POST_EVENT = 'post-event',
  EVENT = 'event'
}

export type HydratedEvent = CollectionEntry<'events'> & {
  presentations: (CollectionEntry<'presentations'> & {
    speaker: CollectionEntry<'speakers'>
  })[]
}

export type HydratedFeedItem = CollectionEntry<'feed'> & {
  event: HydratedEvent
  type: FeedItemType,
  permalink: string,
  html: string
}

export type HydratedFeedItemPreHtml = Omit<HydratedFeedItem, 'html'>