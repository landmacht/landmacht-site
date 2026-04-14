import Link from 'next/link';

import { QuoteForm } from '@/components/QuoteForm';
import { buildMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site';
import { CONTACT, WHATSAPP_LINK } from '@/src/lib/contact';

export const metadata = buildMetadata(
  'Get My Quote or Contact Landmacht',
  `Contact Landmacht Veiligheid in Franschhoek, Paarl, and Wellington. Reach us at ${CONTACT.EMAIL} or ${CONTACT.PHONE_DISPLAY} for disciplined private security services.`
);

export default function ContactPage() {
  return (
    <>
      <section className="section-shell py-16">
        <h1 className="section-title">Get My Quote or Contact Landmacht</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          Tell us about your site and security needs. Our operations team will respond with a practical deployment recommendation.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="card-shell">
            <p className="text-xs uppercase tracking-widest text-tactical-oliveLight">Phone</p>
            <p className="mt-2 text-sm text-zinc-300">{CONTACT.PHONE_DISPLAY}</p>
          </div>
          <div className="card-shell">
            <p className="text-xs uppercase tracking-widest text-tactical-oliveLight">Email</p>
            <p className="mt-2 text-sm text-zinc-300">{CONTACT.EMAIL}</p>
          </div>
          <div className="card-shell">
            <p className="text-xs uppercase tracking-widest text-tactical-oliveLight">Areas Served</p>
            <p className="mt-2 text-sm text-zinc-300">{siteConfig.areas.join(', ')}</p>
          </div>
          <div className="card-shell">
            <p className="text-xs uppercase tracking-widest text-tactical-oliveLight">WhatsApp</p>
            <Link
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex text-sm text-zinc-300 hover:text-zinc-100"
            >
              Start WhatsApp Chat
            </Link>
          </div>
        </div>
      </section>
      <QuoteForm title="Get My Quote" />
    </>
  );
}
