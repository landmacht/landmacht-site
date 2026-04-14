import { SafeImage } from '@/components/SafeImage';
import Link from 'next/link';

import { DeploymentExamples } from '@/components/DeploymentExamples';
import { FAQ } from '@/components/FAQ';
import { Hero } from '@/components/Hero';
import { PackageCards } from '@/components/PackageCards';
import { QuoteForm } from '@/components/QuoteForm';
import { ServiceGrid } from '@/components/ServiceGrid';
import { TrustStrip } from '@/components/TrustStrip';
import { resolveImagePath } from '@/lib/images';
import { buildMetadata } from '@/lib/metadata';
import { homeFaq, services, siteConfig } from '@/lib/site';

export const metadata = buildMetadata(
  'Landmacht Veiligheid | Private Security in Franschhoek, Paarl and Wellington',
  'Landmacht Veiligheid provides disciplined private security services across Franschhoek, Paarl, and Wellington. Contact info@landmacht.co.za or +27 87 265 7594.'
);

const strengths = [
  {
    title: 'Professional Personnel',
    text: 'Vetted, uniformed, and site-ready officers deployed with clear post responsibilities.'
  },
  {
    title: 'Operational Control',
    text: 'Defined post orders, routines, and supervision that maintain consistent standards.'
  },
  {
    title: 'Rapid Escalation',
    text: 'Clear procedures and response channels for incidents requiring immediate action.'
  }
];

const steps = [
  { title: 'Tell Us What You Need', text: 'Share your area, site type, and guard requirements using the quote form or WhatsApp.' },
  { title: 'We Review Your Needs', text: 'We assess your operational risks, staffing needs, and the right service fit for the site.' },
  { title: 'Receive Your Quote Fast', text: 'You get a tailored quote quickly, with practical next steps for deployment and follow-up.' }
];

const servicePositioning = [
  {
    title: 'Estates',
    text: 'Gate control, visible presence, and reporting discipline tailored to residential estates and managed communities.'
  },
  {
    title: 'Farms',
    text: 'Perimeter awareness, access-point control, and structured rural patrol routines for agricultural properties.'
  },
  {
    title: 'Events',
    text: 'Guest screening, controlled movement, and escalation support for private functions and business events.'
  }
];

export default function HomePage() {
  return (
    <>
      <Hero
        title="Disciplined Security. Visible Deterrence. Reliable Control."
        subtitle="Professional guarding and operational oversight for estates, farms, and businesses across Franschhoek, Paarl, Wellington, and surrounding Western Cape coverage."
        primaryCta={{ label: 'Get My Quote', href: '#quote-form' }}
        secondaryCta={{ label: 'WhatsApp Now', href: siteConfig.whatsappUrl }}
      >
        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-zinc-700/80 bg-black/20 px-4 py-4 text-sm text-zinc-200">
            Areas served: {siteConfig.areas.join(', ')} and wider Western Cape coverage on request.
          </div>
          <div className="rounded-2xl border border-zinc-700/80 bg-black/20 px-4 py-4 text-sm text-zinc-200">
            Pricing starts from R19,500 per officer / month excl. VAT.
          </div>
          <div className="rounded-2xl border border-zinc-700/80 bg-black/20 px-4 py-4 text-sm text-zinc-200 sm:col-span-2 xl:col-span-1">
            Fast quoting for estates, farms, events, and commercial sites.
          </div>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-700/80">
          <SafeImage
            src={resolveImagePath('/images/hero-estate-gate.jpg')}
            alt="Security officer monitoring a controlled estate entrance in the Western Cape"
            width={1400}
            height={720}
            className="h-[300px] w-full object-cover sm:h-[380px]"
            priority
          />
        </div>
      </Hero>

      <TrustStrip />
      <div className="section-shell"><div className="section-divider" /></div>

      <section className="section-shell py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {strengths.map((item) => (
            <article key={item.title} className="card-shell">
              <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{item.title}</h2>
              <p className="mt-3 text-sm text-zinc-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="section-shell"><div className="section-divider" /></div>
      <ServiceGrid />

      <PackageCards />
      <div className="section-shell"><div className="section-divider" /></div>

      <section className="section-shell py-16">
        <h2 className="section-title">How It Works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="card-shell">
              <p className="text-sm uppercase tracking-[0.2em] text-tactical-oliveLight">Step {index + 1}</p>
              <h3 className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{step.title}</h3>
              <p className="mt-3 text-sm text-zinc-300">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-shell"><div className="section-divider" /></div>
      <section className="section-shell py-16">
        <h2 className="section-title">Security Positioned for Your Site</h2>
        <p className="mt-4 max-w-3xl text-sm text-zinc-300">
          We structure quotes around the environments we most often protect, so your proposal reflects real deployment requirements rather than a generic package.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {servicePositioning.map((item) => (
            <article key={item.title} className="card-shell">
              <h3 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{item.title}</h3>
              <p className="mt-3 text-sm text-zinc-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="section-shell"><div className="section-divider" /></div>
      <DeploymentExamples />

      <section className="section-shell py-12">
        <div className="card-shell">
          <h2 className="font-heading text-4xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Areas We Serve</h2>
          <p className="mt-3 text-zinc-300">
            {siteConfig.areas.join(', ')}. Use the quick links below to explore coverage and jump straight into the services most often requested across these areas.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/areas" className="btn-secondary">
              View Coverage Details
            </Link>
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="btn-secondary">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="section-shell"><div className="section-divider" /></div>
      <FAQ items={homeFaq} />
      <QuoteForm />

      <section className="section-shell pb-14">
        <div className="card-shell">
          <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Ready to Get Your Quote?</h2>
          <p className="mt-3 text-sm text-zinc-300">
            Request pricing for your site now, or reach out on WhatsApp if you want to speak to us straight away about estates, farms, or event coverage.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="#quote-form" className="btn-primary">
              Get My Quote
            </Link>
            <Link href={siteConfig.whatsappUrl} className="btn-secondary">
              WhatsApp Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
