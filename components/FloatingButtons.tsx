import Link from 'next/link';

import { WHATSAPP_LINK } from '@/src/lib/contact';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <Link
        href={WHATSAPP_LINK}
        className="inline-flex items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-600 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-emerald-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </Link>
      <Link href="#quote-form" className="btn-primary hidden rounded-full px-4 py-3 text-xs uppercase tracking-wide md:inline-flex">
        Get My Quote
      </Link>
    </div>
  );
}
