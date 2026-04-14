'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';

import { siteConfig } from '@/lib/site';

type QuoteFormProps = {
  title?: string;
  embedded?: boolean;
  formId?: string;
  description?: string;
  urgencyText?: string;
  submitLabel?: string;
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

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type ApiResponse = {
  success?: boolean;
  message?: string;
  errors?: FormErrors;
};

const QUOTE_API_ENDPOINT = '/api/quote';

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

export function QuoteForm({
  title = 'Get a Quote in 24 Hours',
  embedded = true,
  formId = 'quote-form',
  description = 'Tell us your area, service needs, and guard requirements for a tailored quote across Franschhoek, Paarl, Wellington, and surrounding Western Cape coverage.',
  urgencyText = 'We typically respond within a few hours.',
  submitLabel = 'Get My Quote'
}: QuoteFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [serverMessage, setServerMessage] = useState('');

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

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (form.phone.trim().length < 8) nextErrors.phone = 'Please enter a valid phone number.';
    if (!form.email.includes('@')) nextErrors.email = 'Please enter a valid email address.';
    if (!form.area.trim()) nextErrors.area = 'Please select your area.';
    if (!form.service.trim()) nextErrors.service = 'Please select a service.';
    if (!form.guardsNeeded.trim()) nextErrors.guardsNeeded = 'Please select guards needed.';

    return nextErrors;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setServerMessage('');
      setSubmitState('idle');
      return;
    }

    setErrors({});
    setServerMessage('');
    setSubmitState('submitting');

    try {
      const response = await fetch(QUOTE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          area: form.area,
          service: form.service,
          guardsNeeded: form.guardsNeeded,
          notes: form.notes
        })
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok || data.success !== true) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerMessage(data.message || 'Submission failed. Please try again in a moment.');
        setSubmitState('error');
        return;
      }

      setSubmitState('success');
      setServerMessage('');
      setForm(initialState);
    } catch {
      setSubmitState('error');
      setServerMessage('Submission failed. Please try again in a moment.');
    }
  };

  const formBody = (
    <div className="card-shell">
      {title ? <h2 className="section-title">{title}</h2> : null}
      <p className="mt-3 max-w-3xl text-sm text-zinc-300">{description}</p>
      <p className="mt-3 text-sm text-zinc-200">
        From R19,500 per officer / month (excl. VAT). VAT charged at the prevailing rate.
      </p>
      <p className="mt-2 text-sm font-medium text-tactical-oliveLight">{urgencyText}</p>

      {submitState === 'success' ? (
        <div className="mt-4 rounded-xl border border-emerald-700/60 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
          Thank you. Your request has been submitted successfully. Our team will respond within 24 hours.
          <p className="mt-3 text-sm text-emerald-200">
            Need a faster response? Message us on WhatsApp and we will assist you directly.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href={siteConfig.whatsappUrl} className="btn-secondary">
              WhatsApp Now
            </Link>
          </div>
        </div>
      ) : null}

      {Object.keys(errors).length > 0 ? (
        <div className="mt-4 rounded-xl border border-rose-700/60 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">
          Please fix the highlighted fields and try again.
        </div>
      ) : null}

      {submitState === 'error' && serverMessage ? (
        <div className="mt-4 rounded-xl border border-rose-700/60 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">
          {serverMessage}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <input
            name="name"
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
            name="phone"
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
            name="email"
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
            name="area"
            className="input-shell w-full"
            value={form.area}
            onChange={(event) => setForm((prev) => ({ ...prev, area: event.target.value }))}
            aria-invalid={!!errors.area}
          >
            <option value="">Select Area</option>
            {areaOptions.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.area ? <p className="mt-1 text-xs text-rose-300">{errors.area}</p> : null}
        </div>

        <div>
          <select
            name="service"
            className="input-shell w-full"
            value={form.service}
            onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
            aria-invalid={!!errors.service}
          >
            <option value="">Select Service</option>
            <option value="Estate Security">Estate Security</option>
            <option value="Farm & Rural Security">Farm & Rural Security</option>
            <option value="Commercial Security">Commercial Security</option>
            <option value="Access Control">Access Control</option>
            <option value="Event Security">Event Security</option>
            <option value="Risk Assessments">Risk Assessments</option>
          </select>
          {errors.service ? <p className="mt-1 text-xs text-rose-300">{errors.service}</p> : null}
        </div>

        <div>
          <select
            name="guardsNeeded"
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
            name="notes"
            className="input-shell min-h-32 w-full"
            placeholder="Notes"
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </div>

        <button
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!canSubmit || submitState === 'submitting'}
          type="submit"
        >
          {submitState === 'submitting' ? 'Submitting...' : submitLabel}
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
