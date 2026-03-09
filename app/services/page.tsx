import { FAQ } from '@/components/FAQ';
import { Hero } from '@/components/Hero';
import { PackageCards } from '@/components/PackageCards';
import { QuoteForm } from '@/components/QuoteForm';
import { ServiceGrid } from '@/components/ServiceGrid';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata(
  'Security Services in Franschhoek, Paarl and Wellington',
  'Estate security, farm and rural security, commercial guarding, access control, event security, and risk assessments in Franschhoek, Paarl, and Wellington.'
);

const servicesFaq = [
  {
    q: 'Which service should we start with?',
    a: 'If needs are unclear, start with a risk assessment. It helps define priorities and the right deployment package.'
  },
  {
    q: 'Can services be combined?',
    a: 'Yes. Many clients combine access control, guarding, and periodic audit support in one plan.'
  },
  {
    q: 'Do you provide short-term and long-term deployments?',
    a: 'Yes. We support both fixed monthly guarding and specific operational periods such as events.'
  },
  {
    q: 'What are the base package rates?',
    a: 'Package rates start from R19,500 per officer / month (excl. VAT). VAT charged at the prevailing rate.'
  }
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Security Services Built for Operational Control"
        subtitle="Disciplined deployments for estates, farms, commercial sites and event environments across Franschhoek, Paarl and Wellington."
        primaryCta={{ label: 'Request a Quote', href: '#quote-form' }}
        secondaryCta={{ label: 'Book Security Assessment', href: '/security-assessment' }}
      />
      <ServiceGrid />
      <PackageCards />
      <FAQ title="Service Questions" items={servicesFaq} />
      <QuoteForm title="Request a Service Quote" />
    </>
  );
}

