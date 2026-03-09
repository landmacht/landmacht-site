import Link from 'next/link';

import { siteConfig } from '@/lib/site';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 hidden flex-col gap-3 md:flex">
      <Link
        href={`https://wa.me/${siteConfig.whatsapp}`}
        className="inline-flex items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-600 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-emerald-500"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </Link>
      <Link href="#quote-form" className="btn-primary rounded-full px-4 py-3 text-xs uppercase tracking-wide">
        Request Quote
      </Link>
    </div>
  );
}

