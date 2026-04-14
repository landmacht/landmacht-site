import { trustItems } from '@/lib/site';

export function TrustStrip() {
  return (
    <section className="section-shell pb-10">
      <div className="rounded-2xl border border-zinc-700/80 bg-tactical-900/60 px-6 py-4 text-sm font-medium text-zinc-200">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
