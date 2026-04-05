import { useRef, useEffect } from 'react';

export const useListSync = (items: any[]) => {
  const idsRef = useRef<string[]>([]);
  
  useEffect(() => {
    if (items.length !== idsRef.current.length) {
      if (items.length > idsRef.current.length) {
        const diff = items.length - idsRef.current.length;
        const newIds = Array.from({ length: diff }, () => Math.random().toString(36).substring(2, 9));
        idsRef.current = [...idsRef.current, ...newIds];
      } else {
        idsRef.current = idsRef.current.slice(0, items.length);
      }
    }
  }, [items.length]);

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
