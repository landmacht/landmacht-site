import { Hero } from '@/components/Hero';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata(
  'About Landmacht Veiligheid',
  'Mission, standards and leadership approach for disciplined private security services in Franschhoek, Paarl and Wellington.'
);

export default function AboutPage() {
  return (
    <>
      <Hero
        title="Disciplined Service Backed by Operational Standards"
        subtitle="Landmacht Veiligheid is positioned as a professional private security partner focused on consistency, visibility, and accountable reporting."
        primaryCta={{ label: 'Get My Quote', href: '/contact#quote-form' }}
      />
      <section className="section-shell pb-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="card-shell">
            <h2 className="font-heading text-2xl uppercase text-zinc-100">Mission</h2>
            <p className="mt-3 text-sm text-zinc-300">
              Deliver reliable on-site security that protects people, access points, and operations through disciplined execution.
            </p>
          </article>
          <article className="card-shell">
            <h2 className="font-heading text-2xl uppercase text-zinc-100">Standards</h2>
            <p className="mt-3 text-sm text-zinc-300">
              We prioritize punctuality, professional conduct, clear procedures, and accountable incident communication on every shift.
            </p>
          </article>
          <article className="card-shell">
            <h2 className="font-heading text-2xl uppercase text-zinc-100">Leadership</h2>
            <p className="mt-3 text-sm text-zinc-300">
              Leadership placeholders can be updated here with profile details, qualifications, and operational responsibilities.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
