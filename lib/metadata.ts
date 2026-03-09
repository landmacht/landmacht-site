import type { Metadata } from 'next';

import { resolveImagePath } from '@/lib/images';
import { siteConfig } from '@/lib/site';

const baseUrl = 'https://www.landmachtveiligheid.co.za';
const ogImage = resolveImagePath('/images/hero-estate-gate.jpg');
const logoIcon = resolveImagePath('/images/landmacht-logo.png');

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} | Private Security in Franschhoek, Paarl & Wellington`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: logoIcon, type: 'image/png' },
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: [{ url: logoIcon, type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }]
  },
  openGraph: {
    title: siteConfig.name,
    description: `${siteConfig.description} ${siteConfig.email} | ${siteConfig.phone}`,
    url: baseUrl,
    siteName: siteConfig.name,
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Landmacht Veiligheid officer at controlled estate entrance in the Western Cape'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Franschhoek, Paarl, Wellington`,
    description: `${siteConfig.description} ${siteConfig.email} | ${siteConfig.phone}`,
    images: [ogImage]
  }
};

export function buildMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
}
