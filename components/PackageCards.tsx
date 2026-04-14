import { packageAddOns, packageCards } from '@/lib/site';

export function PackageCards() {
  return (
    <section className="section-shell py-16">
      <h2 className="section-title">Packages</h2>
      <p className="mt-4 text-zinc-200">From R19,500 per officer / month (excl. VAT). VAT charged at the prevailing rate.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {packageCards.map((item) => (
          <div key={item.name} className="card-shell">
            <p className="text-sm uppercase tracking-[0.18em] text-tactical-oliveLight">{item.name}</p>
            <h3 className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{item.officers}</h3>
            <p className="mt-3 text-lg font-semibold text-zinc-100">{item.price}</p>
            {'note' in item ? <p className="mt-3 text-sm text-tactical-oliveLight">{item.note}</p> : null}
          </div>
        ))}
      </div>
      <div className="card-shell mt-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-200">Add-ons (quote-based)</p>
        <ul className="mt-3 space-y-3 text-sm text-zinc-300">
          {packageAddOns.map((item) => (
            <li key={item} className="leading-6">
              • {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
