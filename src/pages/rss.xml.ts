import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getFeed } from '../data/feed';
import { load as cheerio} from 'cheerio'
import copy from '../copy';

const forRss = (html: string) => {
  const $ = cheerio(html)
  const title = $('h1').text()
  $('h1').remove()
  const content = $('body').html()
  return {title, content}
}

export const GET: APIRoute = async (context) => {
  const site = context.site
  const feed = await getFeed({ site: context.site });
  const items = feed.map(feedItem => {
    const {title, content } = forRss(feedItem.html)
    return {
      link: feedItem.permalink,
      pubDate: feedItem.data.publishedAt,
      content,
      title,
      description: `<![CDATA[<html><body>${content}</body></html>]]>`
    }
  })
  return rss({
    title: copy.rssTitle,
    description: copy.rssDescription,
    site,
    items,
  });
}
