import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/my', '/content/'],
    },
    sitemap: 'https://xn--80achg9d0f.net/sitemap.xml',
  }
}
