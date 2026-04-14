import Link from 'next/link';
import type { ReactNode } from 'react';

type HeroProps = {
  id?: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
};

export function Hero({ id, title, subtitle, primaryCta, secondaryCta, children }: HeroProps) {
  return (
    <section id={id} className="section-shell py-16 sm:py-24">
      <div className="rounded-3xl border border-zinc-700/80 bg-gradient-to-br from-tactical-900/92 to-black/80 p-8 shadow-tactical sm:p-12 lg:p-14">
        <p className="font-heading text-[0.95rem] font-bold uppercase tracking-[0.3em] text-tactical-oliveLight sm:text-[1.1rem]">
          Landmacht Veiligheid
        </p>
        <h1 className="mt-4 max-w-4xl font-heading text-5xl font-bold uppercase tracking-[0.03em] text-zinc-100 sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg">{subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={primaryCta.href} className="btn-primary">
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link href={secondaryCta.href} className="btn-secondary">
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
