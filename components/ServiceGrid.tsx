import { SafeImage } from '@/components/SafeImage';
import Link from 'next/link';

import { resolveImagePath } from '@/lib/images';
import { services } from '@/lib/site';

export function ServiceGrid() {
  return (
    <section className="section-shell py-16">
      <div className="flex items-end justify-between gap-4">
        <h2 className="section-title">Services</h2>
        <Link href="/services" className="link-accent">
          View all services
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.slug} className="card-shell overflow-hidden p-0">
            <SafeImage
              src={resolveImagePath(service.image)}
              alt={`${service.title} security deployment in the Western Cape`}
              width={900}
              height={600}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{service.title}</h3>
              <p className="mt-3 text-sm text-zinc-300">{service.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {service.outcomes.slice(0, 3).map((outcome) => (
                  <li key={outcome}>• {outcome}</li>
                ))}
              </ul>
              <Link href={`/services/${service.slug}`} className="link-accent mt-6 inline-flex">
                Explore service
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

