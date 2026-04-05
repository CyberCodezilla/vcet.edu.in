import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useListSync } from '../hooks/useListSync';

/* ── Sortable Item Wrapper ─────────────────────────────────────────────── */

export const SortableItemWrapper = ({ 
  id, 
  children 
}: { 
  id: string, 
  children: (
    attributes: Record<string, any>, 
    listeners: Record<string, any>, 
    setNodeRef: (node: HTMLElement | null) => void,
    style: React.CSSProperties,
    isDragging: boolean
  ) => React.ReactNode 
}) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({ id });
  
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative',
  };

  return <>{children(attributes, listeners, setNodeRef, style, isDragging)}</>;
};

/* ── Sortable List Context ─────────────────────────────────────────────── */

export const SortableListContext = ({ 
  items, 
  onChange, 
  renderItem 
}: { 
  items: any[], 
  onChange: (items: any[]) => void, 
  renderItem: (
    item: any, 
    index: number, 
    id: string, 
    dragHandleProps: { attributes: Record<string, any>, listeners: Record<string, any> },
    setNodeRef: (node: HTMLElement | null) => void,
    style: React.CSSProperties,
    isDragging: boolean,
    actions: { remove: () => void }
  ) => React.ReactNode 
}) => {
  const { ids, handleMove, handleRemove } = useListSync(items || []);
  const sensors = useSensors(
    useSensor(PointerSensor), 
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = ids.findIndex(id => id === active.id);
      const newIndex = ids.findIndex(id => id === over.id);
      handleMove(oldIndex, newIndex);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {items.map((item, idx) => (
          <SortableItemWrapper key={ids[idx]} id={ids[idx]}>
            {(attributes, listeners, setNodeRef, style, isDragging) => 
               renderItem(
                 item, 
                 idx, 
                 ids[idx], 
                 { attributes, listeners }, 
                 setNodeRef, 
                 style, 
                 isDragging,
                 { 
                   remove: () => {
                     handleRemove(idx);
                     // Call onChange manually removing at idx
                     const next = [...items];
                     next.splice(idx, 1);
                     onChange(next);
                   }
                 }
               )
            }
          </SortableItemWrapper>
        ))}
      </SortableContext>
    </DndContext>
  );
};
