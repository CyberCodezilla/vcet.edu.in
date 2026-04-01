import { useCallback, useMemo } from 'react';
import { resolveApiUrl } from '../../services/api';
import { getMmsImageHolders, type MmsImageHolderItem } from '../../services/mms';
import { useMmsResource } from './useMmsResource';

export type MmsImageScope =
  | 'home'
  | 'about'
  | 'facilities'
  | 'experiential'
  | 'training'
  | 'placement'
  | 'students-life';

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function resolveScope(scope: MmsImageScope):
  | 'homeImages'
  | 'aboutImages'
  | 'facilitiesImages'
  | 'experientialImages'
  | 'trainingImages'
  | 'placementImages'
  | 'studentsLifeImages' {
  switch (scope) {
    case 'home':
      return 'homeImages';
    case 'about':
      return 'aboutImages';
    case 'facilities':
      return 'facilitiesImages';
    case 'experiential':
      return 'experientialImages';
    case 'training':
      return 'trainingImages';
    case 'placement':
      return 'placementImages';
    case 'students-life':
      return 'studentsLifeImages';
  }
}

function extractUrl(item: MmsImageHolderItem | null): string | null {
  if (!item) return null;
  return resolveApiUrl(item.imageUrl ?? item.image_url ?? null);
}

export function useMmsImageHolder(scope: MmsImageScope, holderLabel: string, skip = false): string | null {
  const endpoint = resolveScope(scope);
  const fetcher = useCallback(() => skip ? Promise.resolve([]) : getMmsImageHolders(endpoint), [endpoint, skip]);
  const { data } = useMmsResource(fetcher);

  return useMemo(() => {
    if (!data?.length) return null;

    const byLabel = normalize(holderLabel);

    const exactMatch =
      data.find((item) => normalize(item.label ?? '') === byLabel) ??
      data.find((item) => normalize(item.key ?? '') === byLabel);

    if (exactMatch) return extractUrl(exactMatch);

    const looseMatch = data.find((item) => {
      const candidate = normalize(item.label ?? item.key ?? '');
      return candidate.includes(byLabel) || byLabel.includes(candidate);
    });

    return extractUrl(looseMatch ?? null);
  }, [data, holderLabel]);
}
