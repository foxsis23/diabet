import { MetadataRoute } from 'next'
import { SITE_URL } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL
  const pages: [string, number][] = [
    ['', 1],
    ['/course', 0.9],
    ['/test', 0.8],
    ['/contacts', 0.4],
    ['/privacy', 0.3],
    ['/terms', 0.3],
    ['/disclaimer', 0.3],
  ]
  return pages.map(([path, priority]) => ({ url: base + path, lastModified: new Date(), priority }))
}
