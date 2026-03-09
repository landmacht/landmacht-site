import { SafeImage } from '@/components/SafeImage';

import { Hero } from '@/components/Hero';
import { resolveImagePath } from '@/lib/images';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata(
  'Operations Security Model in Franschhoek, Paarl and Wellington',
  'Landmacht Veiligheid operational model for Franschhoek, Paarl, and Wellington: post orders, shift oversight, incident reporting, audits, escalation procedures, and client communication.'
);

const modelItems = [
  {
    title: 'Post Orders & Routines',
    text: 'Every deployment is guided by documented post orders that define entry control, patrol routes, and communication standards.'
  },
  {
    title: 'Shift Oversight & Discipline',
    text: 'Shift handovers and supervisor checks maintain operational consistency and personnel accountability.'
  },
  {
    title: 'Incident Reporting',
    text: 'Incidents are logged in structured format and escalated to designated client contacts without delay.'
  },
  {
    title: 'Supervisor Visits & Performance Audits',
    text: 'Supervisor visits evaluate adherence to post orders and identify corrective actions where needed.'
  },
  {
    title: 'Escalation Procedures',
    text: 'Escalation pathways are pre-defined during onboarding so responses remain controlled under pressure.'
  },
  {
    title: 'Client Communication',
    text: 'Clients receive practical updates on incidents, trends, and operational adjustments.'
  }
];

export default function OperationsPage() {
  return (
    <>
      <Hero
        title="Operational Security With Clear Control"
        subtitle="Our operating model is built on discipline, oversight, and reliable reporting across every shift."
        primaryCta={{ label: 'Request a Quote', href: '/contact#quote-form' }}
      />

      <section className="section-shell py-10">
        <SafeImage
          src={resolveImagePath('/images/operations-reporting.jpg')}
          alt="Supervisor reviewing incident reporting and shift records"
          width={1300}
          height={720}
          className="h-[340px] w-full rounded-3xl border border-zinc-700/80 object-cover"
        />
      </section>

      <section className="section-shell pb-14">
        <div className="grid gap-6 md:grid-cols-2">
          {modelItems.map((item) => (
            <article key={item.title} className="card-shell">
              <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{item.title}</h2>
              <p className="mt-3 text-sm text-zinc-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
