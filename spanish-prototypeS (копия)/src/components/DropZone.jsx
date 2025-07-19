import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Word } from './Word.jsx';

export function DropZone({ id, items, onWordClick }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="drop-zone bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg p-4 min-h-24 flex flex-wrap items-center gap-2 mb-4"
    >
      <SortableContext 
        id={id} 
        items={items.map(item => item.id)} 
        strategy={rectSortingStrategy}
      >
        {items.map(item => (
          <Word key={item.id} id={item.id} onClick={onWordClick}>
            {item.text}
          </Word>
        ))}
      </SortableContext>
    </div>
  );
}
