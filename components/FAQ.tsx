type FaqItem = { q: string; a: string };

type FaqProps = {
  title?: string;
  items: FaqItem[];
};

export function FAQ({ title = 'Frequently Asked Questions', items }: FaqProps) {
  return (
    <section className="section-shell py-16">
      <h2 className="section-title">{title}</h2>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <details key={item.q} className="card-shell group">
            <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-zinc-100">{item.q}</summary>
            <p className="mt-3 text-sm text-zinc-300">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
