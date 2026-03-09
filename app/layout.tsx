import type { Metadata } from 'next';

import { FloatingButtons } from '@/components/FloatingButtons';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileQuoteSticky } from '@/components/MobileQuoteSticky';
import { defaultMetadata } from '@/lib/metadata';

import './globals.css';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <MobileQuoteSticky />
      </body>
    </html>
  );
}
