import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type QuotePayload = {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  service?: string;
  guardsNeeded?: string;
  notes?: string;
};

type FieldErrors = Partial<Record<'name' | 'phone' | 'email' | 'area' | 'service' | 'guardsNeeded', string>>;

function validatePayload(payload: QuotePayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.name?.trim()) errors.name = 'Name is required.';
  if (!payload.phone?.trim()) errors.phone = 'Phone is required.';
  if (!payload.email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!payload.email.includes('@')) {
    errors.email = 'A valid email is required.';
  }
  if (!payload.area?.trim()) errors.area = 'Area is required.';
  if (!payload.service?.trim()) errors.service = 'Service is required.';
  if (!payload.guardsNeeded?.trim()) errors.guardsNeeded = 'Guards needed is required.';

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotePayload;
    const errors = validatePayload(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Validation failed. Please check required fields.',
          errors
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Server email configuration missing. Please set RESEND_API_KEY.'
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const textBody = [
      'New quote request received from landmacht website.',
      '',
      `Name: ${body.name?.trim()}`,
      `Phone: ${body.phone?.trim()}`,
      `Email: ${body.email?.trim()}`,
      `Area: ${body.area?.trim()}`,
      `Service: ${body.service?.trim()}`,
      `Guards Needed: ${body.guardsNeeded?.trim()}`,
      `Notes: ${body.notes?.trim() || 'N/A'}`
    ].join('\n');

    await resend.emails.send({
      from: 'quotes@landmacht.co.za', // TODO: Verify landmacht.co.za as a sending domain in Resend before production use.
      to: ['info@landmacht.co.za'],
      subject: 'New Quote Request - Landmacht Website',
      text: textBody,
      replyTo: body.email?.trim()
    });

    return NextResponse.json({
      ok: true,
      message: 'Quote request submitted successfully.'
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'Failed to submit quote request. Please try again.'
      },
      { status: 500 }
    );
  }
}
