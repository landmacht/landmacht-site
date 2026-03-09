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
  { title: 'Assess', text: 'Site walk-through, risk priorities, and deployment planning.' },
  { title: 'Deploy', text: 'Structured staffing, post orders, and shift control.' },
  { title: 'Report & Improve', text: 'Incident logs, supervisor feedback, and routine refinement.' }
];

export default function HomePage() {
  return (
    <>
      <Hero
        title="Disciplined Security. Visible Deterrence. Reliable Control."
        subtitle="Professional guarding and operational oversight for estates, farms, and businesses across Franschhoek, Paarl, and Wellington."
        primaryCta={{ label: 'Request a Quote', href: '#quote-form' }}
        secondaryCta={{ label: 'Book a Security Assessment', href: '/security-assessment' }}
      >
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

      <section className="section-shell py-10">
        <div className="card-shell">
          <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Explore Services by Area</h2>
          <p className="mt-3 text-sm text-zinc-300">
            If you are comparing options for Franschhoek estates, Paarl commercial sites, or Wellington farms, use these direct links to navigate quickly.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/areas" className="btn-secondary">
              Areas Coverage
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
      <PackageCards />
      <div className="section-shell"><div className="section-divider" /></div>

      <section className="section-shell py-16">
        <h2 className="section-title">How We Deploy</h2>
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
      <DeploymentExamples />

      <section className="section-shell py-12">
        <div className="card-shell">
          <h2 className="font-heading text-4xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Areas We Serve</h2>
          <p className="mt-3 text-zinc-300">{siteConfig.areas.join(', ')}</p>
          <Link href="/areas" className="btn-secondary mt-5">
            View Coverage Details
          </Link>
        </div>
      </section>

      <div className="section-shell"><div className="section-divider" /></div>
      <FAQ items={homeFaq} />
      <QuoteForm />

      <section className="section-shell pb-14">
        <div className="card-shell">
          <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Contact Landmacht Veiligheid</h2>
          <p className="mt-3 text-sm text-zinc-300">
            Phone: {siteConfig.phone} • Email: {siteConfig.email} • Areas served: {siteConfig.areas.join(', ')}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="tel:+27872657594" className="btn-secondary">
              Call Now
            </Link>
            <Link href={`mailto:${siteConfig.email}`} className="btn-secondary">
              Email Us
            </Link>
            <Link href="#quote-form" className="btn-primary">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
