'use client';

import { useEffect, useState } from 'react';

import { trustItems } from '@/lib/site';

type StickyTrustBarProps = {
  targetId: string;
};

export function StickyTrustBar({ targetId }: StickyTrustBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {
        rootMargin: '-96px 0px 0px 0px',
        threshold: 0
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      className={`fixed left-0 right-0 top-24 z-40 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className="section-shell pt-2">
        <div className="rounded-2xl border border-zinc-700/80 bg-tactical-950/92 px-5 py-3 text-xs font-medium text-zinc-200 shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur sm:text-sm">
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {trustItems.map((item) => (
              <span key={item} className="flex-1 text-center">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
