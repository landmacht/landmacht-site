import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section-shell py-24 text-center">
      <h1 className="font-heading text-5xl font-bold uppercase tracking-[0.03em] text-zinc-100">Page Not Found</h1>
      <p className="mt-4 text-zinc-300">The requested page is not available.</p>
      <Link href="/" className="btn-primary mt-6">
        Return Home
      </Link>
    </section>
  );
}
