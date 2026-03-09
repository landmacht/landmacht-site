'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

import { PLACEHOLDER_IMAGE_PATH } from '@/lib/image-constants';

type SafeImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  fallbackSrc?: string;
};

export function SafeImage({ src, fallbackSrc = PLACEHOLDER_IMAGE_PATH, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

