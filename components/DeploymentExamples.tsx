import { deploymentExamples } from '@/lib/site';

export function DeploymentExamples() {
  return (
    <section className="section-shell py-16">
      <h2 className="section-title">Typical Deployments</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {deploymentExamples.map((item) => (
          <div key={item.title} className="card-shell">
            <h3 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{item.title}</h3>
            <p className="mt-3 text-sm text-zinc-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
