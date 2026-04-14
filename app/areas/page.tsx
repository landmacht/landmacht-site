import { SafeImage } from '@/components/SafeImage';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { resolveImagePath } from '@/lib/images';
import { areaContent, services } from '@/lib/site';

export const metadata = buildMetadata(
  'Security Coverage Areas: Franschhoek, Paarl and Wellington',
  'Security services available in Franschhoek, Paarl, and Wellington with deployment options for estates, farms, and commercial sites.'
);

const areaFaq: Record<string, { q: string; a: string }[]> = {
  Franschhoek: [
    {
      q: 'Do you support estate and hospitality-adjacent properties in Franschhoek?',
      a: 'Yes. Our Franschhoek deployments commonly include controlled access, visitor handling, and visible guarding suited to estate and guest-focused environments.'
    },
    {
      q: 'Can coverage adapt to weekends and peak visitor periods in Franschhoek?',
      a: 'Yes. We align post routines and staffing patterns to high-traffic periods so controls remain consistent during busy times.'
    }
  ],
  Paarl: [
    {
      q: 'What security model is typical for Paarl commercial properties?',
      a: 'Many Paarl sites use a mix of access control, after-hours patrols, and incident reporting with clear management communication.'
    },
    {
      q: 'Can Landmacht support mixed-use operations in Paarl?',
      a: 'Yes. We tailor post orders for sites where office, residential, or service traffic overlap throughout the day.'
    }
  ],
  Wellington: [
    {
      q: 'Is farm and rural security available across Wellington?',
      a: 'Yes. Wellington deployments often focus on perimeter checks, access-point discipline, and practical night deterrence routines.'
    },
    {
      q: 'Do you provide risk assessments before full deployment in Wellington?',
      a: 'Yes. A site assessment can be completed first to prioritize controls and guide the right staffing approach.'
    }
  ]
};

function getServiceLinkByTitle(title: string) {
  const service = services.find((item) => item.title === title);
  return service ? `/services/${service.slug}` : '/services';
}

export default function AreasPage() {
  return (
    <section className="section-shell py-16">
      <h1 className="section-title">Areas We Serve</h1>
      <p className="mt-4 max-w-3xl text-zinc-300">
        Landmacht Veiligheid supports clients across Franschhoek, Paarl, and Wellington with disciplined security deployments and local operational awareness.
      </p>

      <div className="mt-10 space-y-8">
        {areaContent.map((entry) => (
          <article key={entry.area} className="card-shell overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[1fr_1.15fr]">
              <SafeImage
                src={resolveImagePath(entry.image)}
                alt={`Security deployment context in ${entry.area}, Western Cape`}
                width={900}
                height={700}
                className="h-full min-h-[260px] w-full object-cover"
              />
              <div className="p-7">
                <h2 className="font-heading text-4xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{entry.area}</h2>
                <p className="mt-4 text-sm text-zinc-300">{entry.text}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-tactical-oliveLight">Recommended Services</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {entry.recommended.map((serviceTitle) => (
                    <Link key={serviceTitle} href={getServiceLinkByTitle(serviceTitle)} className="btn-secondary">
                      {serviceTitle}
                    </Link>
                  ))}
                </div>

                <div className="section-divider my-6" />

                <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{entry.area} FAQ</h3>
                <div className="mt-3 space-y-3">
                  {(areaFaq[entry.area] ?? []).map((faq) => (
                    <details key={faq.q} className="rounded-2xl border border-zinc-700/70 bg-black/20 p-4">
                      <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-100">{faq.q}</summary>
                      <p className="mt-2 text-sm text-zinc-300">{faq.a}</p>
                    </details>
                  ))}
                </div>

                <Link href="/contact#quote-form" className="btn-primary mt-6">
                  Get My Quote
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

