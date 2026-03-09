import { trustItems } from '@/lib/site';

export function TrustStrip() {
  return (
    <section className="section-shell pb-10">
      <div className="rounded-2xl border border-zinc-700/80 bg-tactical-900/60 px-6 py-4 text-sm font-medium text-zinc-200">
        {trustItems.join(' • ')}
      </div>
    </section>
  );
}
