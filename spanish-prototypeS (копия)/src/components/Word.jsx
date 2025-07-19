import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function Word({ id, children, type, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const typeColors = {
    article: '#FFECB3',
    noun: '#C8E6C9',
    verb: '#BBDEFB',
    adjective: '#E1BEE7',
    default: '#F5F5F5'
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'pointer', // Изменено на pointer для кликабельности
    padding: '10px 15px',
    margin: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: typeColors[type] || typeColors.default,
    touchAction: 'none', // для мобильных устройств
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={handleClick}>
      {children}
    </div>
  );
}
