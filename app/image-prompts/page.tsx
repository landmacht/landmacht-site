import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata(
  'AI Image Prompts for Western Cape Security Visuals',
  'Photorealistic documentary image prompts for Landmacht Veiligheid marketing visuals in Franschhoek, Paarl, and Wellington.'
);

type PromptItem = {
  filename: string;
  size: string;
  prompt: string;
};

const promptItems: PromptItem[] = [
  {
    filename: 'hero-estate-gate.jpg',
    size: '1920x1080 (Hero)',
    prompt:
      'Photorealistic documentary security photography in Western Cape, South Africa. A professional uniformed private security officer at a controlled estate gate near vineyards at first light, disciplined posture, clean modern environment, natural lighting, no weapons, no logos.'
  },
  {
    filename: 'service-estate.jpg',
    size: '1600x900 (Service Banner)',
    prompt:
      'Photorealistic documentary security photography in Franschhoek, Western Cape, South Africa. Professional uniformed officer managing resident and visitor check-in at a secure estate gate with vineyard backdrop, realistic candid composition, no weapons, no logos.'
  },
  {
    filename: 'service-farm.jpg',
    size: '1600x900 (Service Banner)',
    prompt:
      'Photorealistic documentary security photography in Wellington, Western Cape, South Africa. Professional uniformed security officer at a rural farm access gate with perimeter road and vineyards in the distance at dusk, practical field setting, no weapons, no logos.'
  },
  {
    filename: 'service-commercial.jpg',
    size: '1600x900 (Service Banner)',
    prompt:
      'Photorealistic documentary security photography in Paarl, Western Cape, South Africa. Professional uniformed security officer monitoring access outside a warehouse and office loading area at blue hour, clean industrial context, no weapons, no logos.'
  },
  {
    filename: 'service-access-control.jpg',
    size: '1600x900 (Service Banner)',
    prompt:
      'Photorealistic documentary security photography in Western Cape, South Africa. Professional uniformed officer handling access control at a reception checkpoint with visitor register and turnstile, crisp realistic lighting, no weapons, no logos.'
  },
  {
    filename: 'service-events.jpg',
    size: '1600x900 (Service Banner)',
    prompt:
      'Photorealistic documentary security photography in Western Cape, South Africa. Professional uniformed event security team coordinating guest entry at a private venue gate in evening lighting, controlled crowd flow, no weapons, no logos.'
  },
  {
    filename: 'service-risk.jpg',
    size: '1600x900 (Service Banner)',
    prompt:
      'Photorealistic documentary security photography in Western Cape, South Africa. Professional uniformed supervisor conducting a site risk walk-through with clipboard near estate and warehouse perimeter fencing, overcast natural light, no weapons, no logos.'
  },
  {
    filename: 'operations-reporting.jpg',
    size: '1200x800 (Thumbnail)',
    prompt:
      'Photorealistic documentary security photography in Western Cape, South Africa. Professional uniformed supervisor and team reviewing incident reports and shift logs in an operations briefing room at night, realistic practical environment, no weapons, no logos.'
  },
  {
    filename: 'areas-franschhoek.jpg',
    size: '1200x800 (Thumbnail)',
    prompt:
      'Photorealistic documentary security photography in Franschhoek, Western Cape, South Africa. Estate gate and vineyard surroundings with visible professional uniformed security presence during golden hour, calm controlled atmosphere, no weapons, no logos.'
  },
  {
    filename: 'areas-paarl.jpg',
    size: '1200x800 (Thumbnail)',
    prompt:
      'Photorealistic documentary security photography in Paarl, Western Cape, South Africa. Professional uniformed officer on perimeter patrol around warehouse and commercial buildings at dusk, cinematic but realistic look, no weapons, no logos.'
  },
  {
    filename: 'areas-wellington.jpg',
    size: '1200x800 (Thumbnail)',
    prompt:
      'Photorealistic documentary security photography in Wellington, Western Cape, South Africa. Rural property entrance and vineyard edge with professional uniformed security officer at nightfall, visible access control setup, no weapons, no logos.'
  }
];

export default function ImagePromptsPage() {
  return (
    <section className="section-shell py-16">
      <h1 className="section-title">Image Prompts</h1>
      <p className="mt-4 max-w-3xl text-zinc-300">
        Use these exact prompts for consistent documentary-style visuals across the site. All prompts specify Western Cape context, professional uniforms, and explicitly exclude weapons and logos.
      </p>

      <div className="card-shell mt-8">
        <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">Recommended Sizes</h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          <li>• Hero images: 1920x1080</li>
          <li>• Service banners: 1600x900</li>
          <li>• Thumbnails: 1200x800</li>
        </ul>
      </div>

      <div className="mt-8 grid gap-6">
        {promptItems.map((item) => (
          <article key={item.filename} className="card-shell">
            <p className="text-xs uppercase tracking-[0.2em] text-tactical-oliveLight">{item.size}</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{item.filename}</h2>
            <p className="mt-3 rounded-xl border border-zinc-700 bg-black/30 p-4 text-sm text-zinc-200">{item.prompt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
