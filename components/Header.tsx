'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { services, siteConfig } from '@/lib/site';

const topNav = [
  { label: 'Operations', href: '/operations' },
  { label: 'Areas', href: '/areas' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' }
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMenus = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/90 bg-tactical-950/95 backdrop-blur">
      <div className="section-shell flex h-24 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-4 sm:gap-5" onClick={closeMenus}>
          <Image
            src={siteConfig.logo}
            alt="Landmacht Veiligheid logo"
            width={76}
            height={76}
            className="h-12 w-12 shrink-0 object-contain sm:h-[3.25rem] sm:w-[3.25rem] lg:h-[3.75rem] lg:w-[3.75rem]"
            priority
          />
          <div className="leading-tight">
            <span className="block font-heading text-lg font-semibold uppercase tracking-[0.14em] text-zinc-100 sm:text-xl lg:text-2xl">
              Landmacht Veiligheid
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-zinc-400 sm:block">
              Private Security Services
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-zinc-300 lg:flex">
          <div className="group relative">
            <button className="font-medium hover:text-zinc-100">Services</button>
            <div className="invisible absolute left-0 top-full mt-4 w-72 rounded-2xl border border-zinc-700 bg-tactical-900/95 p-3 opacity-0 shadow-tactical transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="space-y-1">
                <li>
                  <Link href="/services" className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-tactical-800">
                    All Services
                  </Link>
                </li>
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-tactical-800 hover:text-zinc-100"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {topNav.map((item) => (
            <Link key={item.href} href={item.href} className="font-medium hover:text-zinc-100">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact#quote-form" className="btn-primary">
            Get My Quote
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 bg-black/30 text-zinc-100 lg:hidden"
        >
          <span className="text-xl leading-none">{mobileOpen ? '×' : '≡'}</span>
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-zinc-800 bg-tactical-950/98 lg:hidden">
          <nav className="section-shell py-4">
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold text-zinc-200 hover:bg-tactical-900"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  aria-expanded={mobileServicesOpen}
                >
                  Services
                  <span>{mobileServicesOpen ? '−' : '+'}</span>
                </button>
                {mobileServicesOpen ? (
                  <div className="mt-1 rounded-xl border border-zinc-800 bg-tactical-900/80 p-2">
                    <Link href="/services" onClick={closeMenus} className="block rounded-lg px-3 py-2 text-zinc-200 hover:bg-tactical-800">
                      All Services
                    </Link>
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2 text-zinc-300 hover:bg-tactical-800 hover:text-zinc-100"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
              {topNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeMenus} className="block rounded-xl px-4 py-3 font-medium text-zinc-300 hover:bg-tactical-900 hover:text-zinc-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contact#quote-form" onClick={closeMenus} className="btn-primary mt-4 w-full">
              Get My Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

