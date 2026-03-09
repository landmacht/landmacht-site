'use client';

import { FormEvent, useMemo, useState } from 'react';

type QuoteFormProps = {
  title?: string;
  embedded?: boolean;
  formId?: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  area: string;
  service: string;
  guardsNeeded: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  area: '',
  service: '',
  guardsNeeded: '',
  notes: ''
};

const areaOptions = ['Franschhoek', 'Paarl', 'Wellington', 'Other'];
const guardOptions = ['1', '2', '3', '4+'];

export function QuoteForm({ title = 'Get a Quote in 24 Hours', embedded = true, formId = 'quote-form' }: QuoteFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const canSubmit = useMemo(
    () =>
      form.name.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.area.trim() &&
      form.service.trim() &&
      form.guardsNeeded.trim(),
    [form]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (form.phone.trim().length < 8) nextErrors.phone = 'Please enter a valid phone number.';
    if (!form.email.includes('@')) nextErrors.email = 'Please enter a valid email address.';
    if (!form.area.trim()) nextErrors.area = 'Please select your area.';
    if (!form.service.trim()) nextErrors.service = 'Please select a service.';
    if (!form.guardsNeeded.trim()) nextErrors.guardsNeeded = 'Please select guards needed.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
    console.log('Quote request payload:', form);

    // TODO: Wire to Formspree endpoint.
    // TODO: Alternatively POST to a Next.js route handler at /api/quote.

    setForm(initialState);
  };

  const formBody = (
    <div className="card-shell">
      {title ? <h2 className="section-title">{title}</h2> : null}
      <p className="mt-3 text-sm text-zinc-200">
        From R19,500 per officer / month (excl. VAT). VAT charged at the prevailing rate.
      </p>

      {submitted ? (
        <div className="mt-4 rounded-xl border border-emerald-700/60 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
          Thank you. Your request has been captured. Our team will respond within 24 hours.
        </div>
      ) : null}

      {Object.keys(errors).length > 0 ? (
        <div className="mt-4 rounded-xl border border-rose-700/60 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">
          Please fix the highlighted fields and submit again.
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <input
            className="input-shell w-full"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            aria-invalid={!!errors.name}
          />
          {errors.name ? <p className="mt-1 text-xs text-rose-300">{errors.name}</p> : null}
        </div>

        <div>
          <input
            className="input-shell w-full"
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            aria-invalid={!!errors.phone}
          />
          {errors.phone ? <p className="mt-1 text-xs text-rose-300">{errors.phone}</p> : null}
        </div>

        <div>
          <input
            className="input-shell w-full"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            aria-invalid={!!errors.email}
          />
          {errors.email ? <p className="mt-1 text-xs text-rose-300">{errors.email}</p> : null}
        </div>

        <div>
          <select
            className="input-shell w-full"
            value={form.area}
            onChange={(event) => setForm((prev) => ({ ...prev, area: event.target.value }))}
            aria-invalid={!!errors.area}
          >
            <option value="">Select Area</option>
            {areaOptions.map((area) => (
              <option key={area} value={area.toLowerCase()}>
                {area}
              </option>
            ))}
          </select>
          {errors.area ? <p className="mt-1 text-xs text-rose-300">{errors.area}</p> : null}
        </div>

        <div>
          <select
            className="input-shell w-full"
            value={form.service}
            onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
            aria-invalid={!!errors.service}
          >
            <option value="">Select Service</option>
            <option value="estate-security">Estate Security</option>
            <option value="farm-rural-security">Farm & Rural Security</option>
            <option value="commercial-security">Commercial Security</option>
            <option value="access-control">Access Control</option>
            <option value="event-security">Event Security</option>
            <option value="risk-assessments">Risk Assessments</option>
          </select>
          {errors.service ? <p className="mt-1 text-xs text-rose-300">{errors.service}</p> : null}
        </div>

        <div>
          <select
            className="input-shell w-full"
            value={form.guardsNeeded}
            onChange={(event) => setForm((prev) => ({ ...prev, guardsNeeded: event.target.value }))}
            aria-invalid={!!errors.guardsNeeded}
          >
            <option value="">Guards Needed</option>
            {guardOptions.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
          {errors.guardsNeeded ? <p className="mt-1 text-xs text-rose-300">{errors.guardsNeeded}</p> : null}
        </div>

        <div className="md:col-span-2">
          <textarea
            className="input-shell min-h-32 w-full"
            placeholder="Notes"
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </div>

        <button className="btn-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={!canSubmit} type="submit">
          Submit Quote Request
        </button>
      </form>
    </div>
  );

  if (!embedded) {
    return <div id={formId}>{formBody}</div>;
  }

  return (
    <section id={formId} className="section-shell py-16">
      {formBody}
    </section>
  );
}

