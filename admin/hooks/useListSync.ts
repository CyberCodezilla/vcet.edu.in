import { useRef } from 'react';

export const useListSync = (items: any[]) => {
  const idsRef = useRef<string[]>([]);
  const counterRef = useRef(0);

  const createId = () => `row-${counterRef.current++}`;

  // Keep id list in sync during render so keys are available on the first paint.
  if (items.length > idsRef.current.length) {
    const diff = items.length - idsRef.current.length;
    const newIds = Array.from({ length: diff }, createId);
    idsRef.current = [...idsRef.current, ...newIds];
  } else if (items.length < idsRef.current.length) {
    idsRef.current = idsRef.current.slice(0, items.length);
  }

  return {
    ids: idsRef.current,
    
    handleMove: (oldIndex: number, newIndex: number) => {
      const draft = [...idsRef.current];
      const [moved] = draft.splice(oldIndex, 1);
      draft.splice(newIndex, 0, moved);
      idsRef.current = draft;
    },
    
    handleRemove: (index: number) => {
      const draft = [...idsRef.current];
      draft.splice(index, 1);
      idsRef.current = draft;
    }
  };
};
