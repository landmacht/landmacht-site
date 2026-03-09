import type { MetadataRoute } from 'next';

import { getAllPosts } from '@/lib/insights';
import { services } from '@/lib/site';

const baseUrl = 'https://www.landmachtveiligheid.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/services',
    '/operations',
    '/areas',
    '/about',
    '/insights',
    '/careers',
    '/contact',
    '/security-assessment'
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const insightRoutes = getAllPosts().map((post) => `/insights/${post.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8
  }));
}
