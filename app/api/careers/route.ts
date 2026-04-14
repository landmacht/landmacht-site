import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type CareersPayload = {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  experience?: string;
};

type FieldErrors = Partial<Record<'name' | 'phone' | 'email' | 'location' | 'experience' | 'cv', string>>;

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const DISABLE_CV_ATTACHMENT = false;
const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);
const WHATSAPP_BUTTON_HTML = `
  <div style="margin:20px 0;">
    <a href="https://wa.me/27786208404?text=Hi%20Landmacht%20Veiligheid%2C%20I%20would%20like%20assistance."
       style="display:inline-block;padding:12px 20px;background:#25D366;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;">
      WhatsApp Us
    </a>
  </div>
`;
const CAREERS_SIGNATURE_HTML = `
  <table style="font-family:Arial,sans-serif;font-size:14px;color:#333;">
    <tr>
      <td style="padding-right:15px;">
        <img src="https://landmacht.co.za/logo.png" alt="Landmacht Veiligheid" width="120" style="display:block;border:0;outline:none;text-decoration:none;" />
      </td>
      <td>
        <strong style="color:#6FAF5E;font-size:18px;">Landmacht Team</strong><br/><br/>
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

function validatePayload(payload: CareersPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.name?.trim()) errors.name = 'Full name is required.';
  if (!payload.phone?.trim()) errors.phone = 'Contact number is required.';
  if (!payload.email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!payload.email.includes('@')) {
    errors.email = 'A valid email is required.';
  }
  if (!payload.location?.trim()) errors.location = 'Current location is required.';
  if (!payload.experience?.trim()) errors.experience = 'Experience is required.';

  return errors;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const cvFile = formData.get('cv');
    const body = {
      name: formData.get('name')?.toString(),
      phone: formData.get('phone')?.toString(),
      email: formData.get('email')?.toString(),
      location: formData.get('location')?.toString(),
      experience: formData.get('experience')?.toString()
    } satisfies CareersPayload;
    const errors = validatePayload(body);

    if (!(cvFile instanceof File)) {
      errors.cv = 'CV upload is required.';
    } else if (!ALLOWED_FILE_TYPES.has(cvFile.type)) {
      errors.cv = 'CV must be a PDF, DOC, or DOCX file.';
    } else if (cvFile.size > MAX_FILE_SIZE_BYTES) {
      errors.cv = 'CV must be 5 MB or smaller.';
    }

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

    if (!(cvFile instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: 'CV upload is required.'
        },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const sender = 'Landmacht Careers <quotes@landmacht.co.za>';
    const recipient = 'careers@landmacht.co.za';
    const cvArrayBuffer = await cvFile.arrayBuffer();
    const cvBuffer = Buffer.from(cvArrayBuffer);
    const base64String = cvBuffer.toString('base64');
    const safeBody = {
      name: escapeHtml(body.name?.trim() || ''),
      phone: escapeHtml(body.phone?.trim() || ''),
      email: escapeHtml(body.email?.trim() || ''),
      location: escapeHtml(body.location?.trim() || ''),
      experience: escapeHtml(body.experience?.trim() || '')
    };

    const textBody = [
      'New careers application received from landmacht website.',
      '',
      `Full Name: ${body.name?.trim()}`,
      `Contact Number: ${body.phone?.trim()}`,
      `Email: ${body.email?.trim()}`,
      `Current Location: ${body.location?.trim()}`,
      `Experience: ${body.experience?.trim()}`
    ].join('\n');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f4; padding: 24px; color: #18181b;">
        <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden;">
          <div style="padding: 24px 28px; background-color: #18181b; color: #fafafa;">
            <p style="margin: 0; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.8;">Landmacht Website</p>
            <h1 style="margin: 10px 0 0; font-size: 24px; line-height: 1.3;">New Careers Application</h1>
          </div>
          <div style="padding: 28px;">
            <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #3f3f46;">
              A new candidate submitted an application through the Landmacht careers page.
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600; width: 180px;">Full Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">Contact Number</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">Current Location</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7;">${safeBody.location}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0 0; font-weight: 600; vertical-align: top;">Experience</td>
                <td style="padding: 10px 0 0; white-space: pre-wrap;">${safeBody.experience}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `;

    try {
      console.log('Sending careers email with sender and recipient:', {
        from: sender,
        to: recipient
      });
      console.log('Careers email debug delivery settings:', {
        finalRecipient: recipient,
        attachmentEnabled: !DISABLE_CV_ATTACHMENT,
        attachmentFileName: cvFile.name,
        attachmentMimeType: cvFile.type,
        attachmentBase64Length: base64String.length
      });
      console.log('Careers CV attachment details:', {
        fileName: cvFile.name,
        fileSize: cvFile.size,
        fileType: cvFile.type,
        hasBase64String: Boolean(base64String),
        base64Length: base64String.length
      });

      if (DISABLE_CV_ATTACHMENT) {
        console.log('Careers CV attachment sending skipped because DISABLE_CV_ATTACHMENT is true.');
      }

      const resendResponse = await resend.emails.send({
        from: sender,
        to: [recipient],
        subject: 'New Careers Application - Landmacht Website',
        text: textBody,
        html: htmlBody,
        replyTo: body.email?.trim(),
        attachments: DISABLE_CV_ATTACHMENT
          ? undefined
          : [
              {
                filename: cvFile.name,
                content: base64String,
                contentType: cvFile.type
              }
            ]
      });

      console.log('Resend careers email send response:', resendResponse);

      if (resendResponse.error || !resendResponse.data?.id) {
        const sendError = resendResponse.error ?? new Error('CV email failed to send.');
        console.error('Resend careers email send failed:', sendError);
        return NextResponse.json(
          {
            success: false,
            message: sendError?.message || 'CV email failed to send.'
          },
          { status: 500 }
        );
      }

      const careersAutoReplyHtml = `
        <div style="font-family:Arial,sans-serif;background-color:#f5f5f4;padding:24px;color:#18181b;">
          <table style="max-width:640px;width:100%;margin:0 auto;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:16px;">
            <tr>
              <td style="padding:24px 28px;background-color:#18181b;color:#fafafa;">
                <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;opacity:0.8;">Landmacht Veiligheid Careers</p>
                <h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;">Application Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3f3f46;">Hello ${safeBody.name},</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3f3f46;">
                  Thank you for your application. We have received it successfully.
                </p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3f3f46;">
                  Our recruitment team will review your submission and we will make contact if your profile matches our current requirements.
                </p>
                ${WHATSAPP_BUTTON_HTML}
                ${CAREERS_SIGNATURE_HTML}
              </td>
            </tr>
          </table>
        </div>
      `;

      try {
        const autoReplyResponse = await resend.emails.send({
          from: 'Landmacht Careers <careers@landmacht.co.za>',
          to: [body.email?.trim() || ''],
          subject: 'Application Received | Landmacht Veiligheid Careers',
          html: careersAutoReplyHtml
        });

        console.log('Careers auto-reply send response:', autoReplyResponse);

        if (autoReplyResponse.error || !autoReplyResponse.data?.id) {
          console.error('Careers auto-reply send failed:', autoReplyResponse.error ?? autoReplyResponse);
        }
      } catch (error) {
        console.error('Careers auto-reply send threw an error:', error);
      }
    } catch (error) {
      console.error('Resend careers email send threw an error:', error);
      return NextResponse.json(
        {
          success: false,
          message: error instanceof Error ? error.message : 'CV email failed to send.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Careers application submission failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit application. Please try again.'
      },
      { status: 500 }
    );
  }
}
