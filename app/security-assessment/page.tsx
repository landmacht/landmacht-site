import { QuoteForm } from '@/components/QuoteForm';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata(
  'Security Assessment for Estates, Farms and Commercial Sites',
  'Book a security assessment in Franschhoek, Paarl or Wellington. Get practical risk priorities and deployment recommendations.'
);

export default function SecurityAssessmentPage() {
  return (
    <>
      <section className="section-shell py-16">
        <div className="card-shell">
          <p className="text-xs uppercase tracking-[0.2em] text-tactical-oliveLight">Security Assessment</p>
          <h1 className="mt-4 font-heading text-4xl uppercase tracking-wide text-zinc-100 sm:text-5xl">
            Identify Site Risks Before They Become Incidents
          </h1>
          <p className="mt-5 max-w-3xl text-zinc-300">
            Our assessment process reviews your current controls, identifies vulnerable routines, and gives practical recommendations for staffing and operational improvements.
          </p>
        </div>
      </section>
      <QuoteForm title="Book a Security Assessment" />
    </>
  );
}

