import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-black/35 py-14">
      <div className="section-shell grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={siteConfig.logo}
              alt="Landmacht Veiligheid logo"
              width={84}
              height={84}
              className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
            />
            <p className="font-heading text-3xl font-bold uppercase tracking-[0.03em] text-zinc-100">{siteConfig.name}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm text-zinc-300">
            Professional private security services with disciplined operational oversight.
          </p>
          <p className="mt-4 text-sm text-zinc-300">{siteConfig.phone}</p>
          <p className="text-sm text-zinc-300">{siteConfig.email}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>
              <Link href="/services" className="hover:text-zinc-100">
                Services
              </Link>
            </li>
            <li>
              <Link href="/operations" className="hover:text-zinc-100">
                Operations
              </Link>
            </li>
            <li>
              <Link href="/areas" className="hover:text-zinc-100">
                Areas
              </Link>
            </li>
            <li>
              <Link href="/insights" className="hover:text-zinc-100">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-zinc-100">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Areas Served</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {siteConfig.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <Link href="tel:+27872657594" className="mt-4 inline-flex text-sm text-zinc-300 hover:text-zinc-100">
            Call {siteConfig.phone}
          </Link>
          <br />
          <Link href={`mailto:${siteConfig.email}`} className="inline-flex text-sm text-zinc-300 hover:text-zinc-100">
            Email {siteConfig.email}
          </Link>
        </div>
      </div>

      <div className="section-shell mt-10 border-t border-zinc-800 pt-6 text-xs text-zinc-400">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
