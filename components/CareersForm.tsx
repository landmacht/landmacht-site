'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
  experience: string;
};

type FormErrors = Partial<Record<keyof FormState | 'cv', string>>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type ApiResponse = {
  success?: boolean;
  message?: string;
  errors?: FormErrors;
};

const CAREERS_API_ENDPOINT = '/api/careers';

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  location: '',
  experience: ''
};

export function CareersForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSubmit = useMemo(
    () => form.name.trim() && form.phone.trim() && form.email.trim() && form.location.trim() && form.experience.trim() && cvFile,
    [cvFile, form]
  );

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (form.phone.trim().length < 8) nextErrors.phone = 'Please enter a valid contact number.';
    if (!form.email.includes('@')) nextErrors.email = 'Please enter a valid email address.';
    if (!form.location.trim()) nextErrors.location = 'Please enter your current location.';
    if (!form.experience.trim()) nextErrors.experience = 'Please provide your relevant experience.';
    if (!cvFile) nextErrors.cv = 'Please upload your CV.';

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
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email);
      formData.append('location', form.location);
      formData.append('experience', form.experience);
      if (cvFile) {
        formData.append('cv', cvFile);
      }

      const response = await fetch(CAREERS_API_ENDPOINT, {
        method: 'POST',
        body: formData
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok || data.success !== true) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerMessage(data.message || 'Application failed to submit. Please try again in a moment.');
        setSubmitState('error');
        return;
      }

      setSubmitState('success');
      setServerMessage('');
      setForm(initialState);
      setCvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch {
      setSubmitState('error');
      setServerMessage('Application failed to submit. Please try again in a moment.');
    }
  };

  return (
    <>
      {submitState === 'success' ? (
        <div className="mt-4 rounded-xl border border-emerald-700/60 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
          Thank you. Your application has been submitted successfully. Our recruitment team will review your details and contact you if your profile is a fit.
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
            className="input-shell w-full"
            placeholder="Full name"
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
          <input
            className="input-shell w-full"
            placeholder="Current location"
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            aria-invalid={!!errors.location}
          />
          {errors.location ? <p className="mt-1 text-xs text-rose-300">{errors.location}</p> : null}
        </div>

        <div className="md:col-span-2">
          <textarea
            className="input-shell min-h-32 w-full"
            placeholder="Relevant experience"
            value={form.experience}
            onChange={(event) => setForm((prev) => ({ ...prev, experience: event.target.value }))}
            aria-invalid={!!errors.experience}
          />
          {errors.experience ? <p className="mt-1 text-xs text-rose-300">{errors.experience}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-200">Upload CV</label>
          <input
            ref={fileInputRef}
            className="input-shell mt-2 w-full file:mr-4 file:rounded-lg file:border-0 file:bg-tactical-olive file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-900"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setCvFile(file);
              setErrors((prev) => ({ ...prev, cv: undefined }));
            }}
            aria-invalid={!!errors.cv}
          />
          <p className="mt-2 text-xs text-zinc-500">Accepted formats: PDF, DOC, DOCX</p>
          {errors.cv ? <p className="mt-1 text-xs text-rose-300">{errors.cv}</p> : null}
        </div>

        <button
          className="btn-primary w-fit disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!canSubmit || submitState === 'submitting'}
          type="submit"
        >
          {submitState === 'submitting' ? 'Submitting...' : 'Apply Now'}
        </button>
      </form>
    </>
  );
}
