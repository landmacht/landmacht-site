import { createHmac } from 'node:crypto';

type Quote = { name?: string; email?: string; phone?: string; service?: string; area?: string; guardsNeeded?: string; notes?: string; submissionId?: string; sourcePage?: string };
type Receipt = { submission_id: string; payload_hash: string };
type Delivery = { data?: { id: string } | null; error?: { message: string; statusCode?: number | null } | null };
type Slot = 'primary' | 'acknowledgement';

async function requestCrm(input: object) {
  const secret = process.env.CRM_INTAKE_SECRET;
  const base = process.env.VANTORYN_CRM_API_URL;
  if (!secret || secret.length < 32 || !base) throw new Error('CRM intake is not configured');
  const url = new URL('/crm/intake', base);
  if (url.protocol !== 'https:' && !['127.0.0.1', 'localhost'].includes(url.hostname)) throw new Error('Secure CRM endpoint required');
  const raw = JSON.stringify(input), timestamp = String(Date.now());
  const signature = createHmac('sha256', secret).update(timestamp + '.' + raw).digest('hex');
  const response = await fetch(url, { method: 'POST', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(12000),
    headers: { 'Content-Type': 'application/json', 'x-crm-timestamp': timestamp, 'x-crm-signature': 'v1=' + signature }, body: raw });
  if (!response.ok) throw new Error('Enquiry could not be saved');
  const result = await response.json();
  if (!result.ok || !result.data) throw new Error('Invalid enquiry receipt');
  return result.data;
}

export async function receiveQuote(body: Quote): Promise<Receipt | null> {
  if (process.env.VANTORYN_CRM_ENABLED !== 'true') return null;
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(body.submissionId || '')) throw new Error('Submission ID required');
  const source = (body.sourcePage || '/').split('?')[0];
  if (!/^\/(?:[a-z0-9/-]*)$/i.test(source) || source.startsWith('/careers')) throw new Error('Invalid enquiry source');
  const receipt = await requestCrm({ operation: 'receive', submission_id: body.submissionId, enquiry: {
    name: body.name, contact_email: body.email, contact_phone: body.phone, title: body.service + ' enquiry',
    service: body.service, area: body.area, guards_needed: body.guardsNeeded, original_enquiry: body.notes,
    source: 'website', source_page: source,
  } });
  if (receipt.accepted !== true || typeof receipt.payload_hash !== 'string') throw new Error('Enquiry not accepted');
  return { submission_id: body.submissionId!, payload_hash: receipt.payload_hash };
}

export async function deliverQuoteEmail(receipt: Receipt | null, slot: Slot, send: (key?: string) => Promise<Delivery>): Promise<Delivery> {
  if (!receipt) return send();
  // The durable claim owns delivery. Ambiguous attempts are reviewed, never auto-replayed.
  try {
    const claim = await requestCrm({ ...receipt, operation: 'claim', slot });
    if (!claim.claimed) return { data: { id: 'recorded-' + claim.state } };
    let result: Delivery;
    try { result = await send('landmacht-quote-' + receipt.submission_id + '-' + slot); }
    catch { result = { error: { message: 'Delivery unconfirmed' } }; }
    const state = result.data?.id ? 'sent' : result.error?.statusCode && result.error.statusCode < 500 ? 'failed' : 'unknown';
    await requestCrm({ ...receipt, operation: 'finish', slot, state });
    if (state !== 'sent') console.warn('Quote email needs review:', slot, state);
    return result;
  } catch {
    console.warn('Quote delivery receipt needs review:', slot);
    return { error: { message: 'Delivery unconfirmed' } };
  }
}
