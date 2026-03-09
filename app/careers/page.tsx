import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata(
  'Security Careers in Franschhoek, Paarl and Wellington',
  'Apply for security roles at Landmacht Veiligheid. Professional conduct, discipline and reliability are core requirements.'
);

export default function CareersPage() {
  return (
    <section className="section-shell py-16">
      <h1 className="section-title">Careers</h1>
      <p className="mt-4 max-w-3xl text-zinc-300">
        We recruit disciplined team members with professional conduct and strong site awareness. Suitable applicants are considered for estate, farm, commercial, and access-control deployments.
      </p>

      <div className="card-shell mt-8">
        <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Apply to Join the Team</h2>
        <p className="mt-3 text-sm text-zinc-300">
          Submit your details by email. Include your location, availability, and relevant guarding experience.
        </p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="input-shell" placeholder="Full name" />
          <input className="input-shell" placeholder="Phone" />
          <input className="input-shell" placeholder="Email" />
          <input className="input-shell" placeholder="Area" />
          <textarea className="input-shell min-h-32 md:col-span-2" placeholder="Experience and availability" />
          <a
            href="mailto:careers@landmachtveiligheid.co.za?subject=Landmacht%20Careers%20Application"
            className="btn-primary w-fit"
          >
            Submit via Email
          </a>
        </form>
        <p className="mt-4 text-xs text-zinc-500">TODO: Replace mailto workflow with integrated careers submission endpoint.</p>
      </div>
    </section>
  );
}
