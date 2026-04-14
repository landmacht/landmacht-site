import { trustItems } from '@/lib/site';

export function TrustStrip() {
  return (
    <section className="section-shell pb-10">
      <div className="rounded-2xl border border-zinc-700/80 bg-tactical-900/60 px-6 py-5 text-sm font-medium text-zinc-200">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          {trustItems.map((item) => (
            <span key={item} className="flex-1 text-center">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
