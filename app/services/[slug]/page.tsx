import { SafeImage } from '@/components/SafeImage';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FAQ } from '@/components/FAQ';
import { PackageCards } from '@/components/PackageCards';
import { QuoteForm } from '@/components/QuoteForm';
import { buildMetadata } from '@/lib/metadata';
import { resolveImagePath } from '@/lib/images';
import { services } from '@/lib/site';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return buildMetadata('Service Not Found', 'Requested service page could not be found.');
  }

  return buildMetadata(
    `${service.title} in Franschhoek, Paarl and Wellington`,
    `${service.summary} Request a tailored quote for ${service.title.toLowerCase()} in Franschhoek, Paarl, and Wellington.`
  );
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-8 rounded-3xl border border-zinc-800 bg-tactical-900/70 p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-tactical-oliveLight">Service Detail</p>
            <h1 className="mt-4 font-heading text-4xl uppercase tracking-wide text-zinc-100 sm:text-5xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-zinc-300">{service.summary}</p>
          </div>
          <SafeImage
            src={resolveImagePath(service.image)}
            alt={`${service.title} deployment team in the Western Cape`}
            width={900}
            height={650}
            className="h-full min-h-[260px] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="section-shell pb-6">
        <div className="card-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Get a Quote in 24 Hours</h2>
            <p className="mt-2 text-sm text-zinc-300">Share your site requirements and we will send a practical deployment recommendation.</p>
          </div>
          <Link href="#quote-form" className="btn-primary w-full md:w-auto">
            Get a Quote in 24 Hours
          </Link>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="card-shell">
          <h2 className="section-title">What We Do</h2>
          <ul className="mt-5 space-y-3 text-zinc-300">
            {service.whatWeDo.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="card-shell">
          <h2 className="section-title">Typical Deployment</h2>
          <p className="mt-4 text-zinc-300">{service.deployment}</p>
        </div>
      </section>

      <PackageCards />
      <FAQ title={`${service.title} FAQ`} items={service.faq} />

      <section className="section-shell pb-6">
        <div className="card-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Get a Quote in 24 Hours</h2>
            <p className="mt-2 text-sm text-zinc-300">Tell us your area, service type, and guards needed to receive a detailed quote.</p>
          </div>
          <Link href="#quote-form" className="btn-primary w-full md:w-auto">
            Request a Quote
          </Link>
        </div>
      </section>

      <QuoteForm title="Get a Quote in 24 Hours" formId="quote-form" />
    </>
  );
}

