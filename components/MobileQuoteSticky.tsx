'use client';

import { useState } from 'react';

import { QuoteForm } from '@/components/QuoteForm';

export function MobileQuoteSticky() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-xl bg-tactical-olive px-5 py-3 text-sm font-semibold text-zinc-900 shadow-[0_10px_24px_rgba(111,124,77,0.35)] md:hidden"
      >
        Request a Quote
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] bg-black/75 p-4 md:hidden" role="dialog" aria-modal="true">
          <div className="mx-auto mt-6 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-700 bg-tactical-950 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-2xl uppercase tracking-[0.03em] text-zinc-100">Get a Quote in 24 Hours</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-300"
              >
                Close
              </button>
            </div>
            <QuoteForm embedded={false} formId="mobile-quote-form" title="" />
          </div>
        </div>
      ) : null}
    </>
  );
}
