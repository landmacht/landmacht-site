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

const WHATSAPP_BUTTON_HTML = `
  <div style="margin:20px 0;">
    <a href="https://wa.me/27786208404?text=Hi%20Landmacht%20Veiligheid%2C%20I%20would%20like%20assistance."
       style="display:inline-block;padding:12px 20px;background:#25D366;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;">
      WhatsApp Us
    </a>
  </div>
`;

const QUOTE_SIGNATURE_HTML = `
  <table style="font-family:Arial,sans-serif;font-size:14px;color:#333;">
    <tr>
      <td style="padding-right:15px;">
        <img src="https://landmacht.co.za/images/landmacht-logo.png" alt="Landmacht Veiligheid" width="120" style="display:block;border:0;outline:none;text-decoration:none;" />
      </td>
      <td>
        <strong style="color:#6FAF5E;font-size:18px;">Landmacht Team</strong><br/>
        <span style="color:#6FAF5E;">Quotes Department</span><br/><br/>
        <strong>P:</strong> +27 78 620 8404<br/>
        <strong>E:</strong> <a href="mailto:info@landmacht.co.za" style="color:#6FAF5E;text-decoration:none;">info@landmacht.co.za</a><br/>
        <strong>W:</strong> <a href="https://www.landmacht.co.za" style="color:#6FAF5E;text-decoration:none;">www.landmacht.co.za</a>
      </td>
    </tr>
  </table>
`;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

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
          success: false,
          message: 'Validation failed. Please check required fields.',
          errors
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    console.log('RESEND_API_KEY exists:', Boolean(apiKey));

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing RESEND_API_KEY'
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const safeBody = {
      name: escapeHtml(body.name?.trim() || ''),
      phone: escapeHtml(body.phone?.trim() || ''),
      email: escapeHtml(body.email?.trim() || ''),
      area: escapeHtml(body.area?.trim() || ''),
      service: escapeHtml(body.service?.trim() || ''),
      guardsNeeded: escapeHtml(body.guardsNeeded?.trim() || ''),
      notes: escapeHtml(body.notes?.trim() || 'N/A')
    };

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

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f4; padding: 24px; color: #18181b;">
        <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden;">
          <div style="padding: 24px 28px; background-color: #18181b; color: #fafafa;">
            <p style="margin: 0; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.8;">Landmacht Website</p>
            <h1 style="margin: 10px 0 0; font-size: 24px; line-height: 1.3;">New Quote / Contact Request</h1>
          </div>
          <div style="padding: 28px;">
            <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #3f3f46;">
              A new enquiry was submitted through the website quote, contact, or security assessment flow.
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600; width: 180px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">Area</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.area}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">Service</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.service}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">Guards Needed</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.guardsNeeded}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0 0; font-weight: 600; vertical-align: top;">Notes</td>
                <td style="padding: 10px 0 0; white-space: pre-wrap;">${safeBody.notes}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `;

    try {
      const resendResponse = await resend.emails.send({
        from: 'Landmacht Quotes <quotes@landmacht.co.za>',
        to: ['armand@landmacht.co.za'],
        subject: 'New Quote Request - Landmacht Website',
        text: textBody,
        html: htmlBody,
        replyTo: body.email?.trim()
      });

      console.log('Resend email send response:', resendResponse);

      if (resendResponse.error || !resendResponse.data?.id) {
        const sendError = resendResponse.error ?? new Error('Email failed to send.');
        console.error('Resend email send failed:', sendError);
        return NextResponse.json(
          {
            success: false,
            message: sendError?.message || 'Email failed to send.'
          },
          { status: 500 }
        );
      }

      const quoteAutoReplyHtml = `
        <div style="font-family:Arial,sans-serif;background-color:#f5f5f4;padding:24px;color:#18181b;">
          <table style="max-width:640px;width:100%;margin:0 auto;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:16px;">
            <tr>
              <td style="padding:24px 28px;background-color:#18181b;color:#fafafa;">
                <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;opacity:0.8;">Landmacht Veiligheid</p>
                <h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;">Quote Request Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3f3f46;">Hello ${safeBody.name},</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3f3f46;">
                  Thank you for contacting Landmacht Veiligheid. We have received your quote request successfully.
                </p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3f3f46;">
                  Our team will review your requirements and reply shortly with the next steps.
                </p>
                ${WHATSAPP_BUTTON_HTML}
                ${QUOTE_SIGNATURE_HTML}
              </td>
            </tr>
          </table>
        </div>
      `;

      try {
        const autoReplyResponse = await resend.emails.send({
          from: 'Landmacht Veiligheid <quotes@landmacht.co.za>',
          to: [body.email?.trim() || ''],
          subject: 'Quote Request Received | Landmacht Veiligheid',
          html: quoteAutoReplyHtml
        });

        console.log('Quote auto-reply send response:', autoReplyResponse);

        if (autoReplyResponse.error || !autoReplyResponse.data?.id) {
          console.error('Quote auto-reply send failed:', autoReplyResponse.error ?? autoReplyResponse);
        }
      } catch (error) {
        console.error('Quote auto-reply send threw an error:', error);
      }
    } catch (error) {
      console.error('Resend email send threw an error:', error);
      return NextResponse.json(
        {
          success: false,
          message: error instanceof Error ? error.message : 'Email failed to send.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quote request submission failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit quote request. Please try again.'
      },
      { status: 500 }
    );
  }
}
