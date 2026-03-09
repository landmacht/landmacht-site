import fs from 'node:fs';
import path from 'node:path';

import { PLACEHOLDER_IMAGE_PATH } from '@/lib/image-constants';

export { PLACEHOLDER_IMAGE_PATH };

export function resolveImagePath(imagePath: string): string {
  if (!imagePath.startsWith('/images/')) {
    return PLACEHOLDER_IMAGE_PATH;
  }

  const relativePath = imagePath.replace(/^\//, '');
  const fullPath = path.join(process.cwd(), 'public', relativePath);

  return fs.existsSync(fullPath) ? imagePath : PLACEHOLDER_IMAGE_PATH;
}
