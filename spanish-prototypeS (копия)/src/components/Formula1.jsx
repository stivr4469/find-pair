import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  rectIntersection
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { DropZone } from './DropZone.jsx';
import { Word } from '././Word.jsx';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';



export const Formula1 = ({ currentExercise, onNextExercise, onBackToMenu }) => {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState({ wordBank: [], sentence: [] });
  const [activeId, setActiveId] = useState(null);
  const [isFormulaCompletedModalOpen, setIsFormulaCompletedModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage('');
      }, 3000); // Скрыть через 3 секунды
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Require the mouse to move by 5 pixels before activating
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Перемещаем проверку currentExercise сюда, чтобы хуки вызывались безусловно
  if (!currentExercise) {
    return <p>Загрузка упражнения...</p>;
  }

  const wordBank = useMemo(() => {
    if (!currentExercise || !currentExercise.wordBank) return [];
    return currentExercise.wordBank.map((word, index) => ({ id: `word-${index}-${word.text}`, text: word.text, type: word.type })).sort(() => Math.random() - 0.5);
  }, [currentExercise]); // Зависимость от всего currentExercise

  useEffect(() => {
    if (currentExercise) {
      setItems({
        wordBank: wordBank,
        sentence: [],
      });
    }
  }, [currentExercise, wordBank]);

  function findContainer(id) {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => items[key].find((item) => item.id === id));
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    setItems((prev) => {
      const newItems = { ...prev };
      const sourceItems = newItems[activeContainer];
      const destinationItems = newItems[overContainer];

      const activeIndex = sourceItems.findIndex((item) => item.id === active.id);
      let overIndex = destinationItems.findIndex((item) => item.id === over.id);

      if (activeContainer === overContainer) {
        const newContainerItems = [...sourceItems];
        const [movedItem] = newContainerItems.splice(activeIndex, 1);
        newContainerItems.splice(overIndex, 0, movedItem);
        newItems[activeContainer] = newContainerItems;
      } else {
        const newSourceItems = [...sourceItems];
        const newDestinationItems = [...destinationItems];

        const [movedItem] = newSourceItems.splice(activeIndex, 1);
        if (overIndex < 0) {
            overIndex = newDestinationItems.length;
        }
        newDestinationItems.splice(overIndex, 0, movedItem);

        newItems[activeContainer] = newSourceItems;
        newItems[overContainer] = newDestinationItems;
      }
      return newItems;
    });

    setActiveId(null);
  }

  const handleCheck = useCallback(() => {
    if (!currentExercise) return;
    const userAnswer = items.sentence.map(word => word.text).join(' ');
    const correctAnswer = currentExercise.correct.join(' ');
    if (userAnswer === correctAnswer) {
      setNotificationMessage('Правильно!');
    } else {
      setNotificationMessage(`Неправильно. Попробуйте еще раз. Правильный ответ: ${correctAnswer}`);
    }
    setShowNotification(true);
  }, [items.sentence, currentExercise]);

  const handleSpeak = useCallback(() => {
    if (!currentExercise || !currentExercise.es) return;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentExercise.es);
      utterance.lang = 'es-ES'; // Устанавливаем испанский язык
      window.speechSynthesis.speak(utterance);
    } else {
      setNotificationMessage('Извините, ваш браузер не поддерживает синтез речи.');
      setShowNotification(true);
    }
  }, [currentExercise]);

  const handleNext = useCallback(() => {
    onNextExercise();
  }, [onNextExercise]);

  const handleReset = useCallback(() => {
    if (currentExercise) {
      const shuffledWordBank = currentExercise.wordBank.map((word, index) => ({ id: `word-${index}-${word.text}`, text: word.text, type: word.type })).sort(() => Math.random() - 0.5);
      setItems({
        wordBank: shuffledWordBank,
        sentence: [],
      });
    }
  }, [currentExercise]);

  const filteredWordBank = useMemo(() => {
    if (filter === 'all') {
      return items.wordBank;
    } else {
      return items.wordBank.filter(word => word.type === filter);
    }
  }, [items.wordBank, filter]);

  const handleWordClick = (wordId) => {
    const container = findContainer(wordId);
    if (!container) return;

    const sourceContainer = container;
    const destinationContainer = sourceContainer === 'wordBank' ? 'sentence' : 'wordBank';

    setItems((prev) => {
      const newItems = { ...prev };
      const sourceItems = [...newItems[sourceContainer]];
      const destinationItems = [...newItems[destinationContainer]];

      const wordIndex = sourceItems.findIndex((item) => item.id === wordId);
      if (wordIndex === -1) return prev; // Слово не найдено

      const [movedItem] = sourceItems.splice(wordIndex, 1);
      destinationItems.push(movedItem);

      newItems[sourceContainer] = sourceItems;
      newItems[destinationContainer] = destinationItems;

      return newItems;
    });
  };

  const activeItem = activeId ? Object.values(items).flat().find(item => item.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{currentExercise.name}</h1>
          <Button variant="outline" onClick={onBackToMenu}>Назад в меню</Button>
        </div>
        <p className="mb-4">Составьте предложение:</p>
        <h2 className="text-xl font-semibold mb-2">{currentExercise.ru}</h2>
        <DropZone id="sentence" items={items.sentence} onWordClick={handleWordClick} />

        {/* Удален заголовок "Банк слов:" */}
        <DropZone id="wordBank" items={items.wordBank} onWordClick={handleWordClick} />

        <div className="flex flex-col md:flex-row gap-2 mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            onClick={handleCheck}
          >
            Проверить
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSpeak}
          >
            Прослушать
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNext}
          >
            Далее
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Сбросить
          </button>
        </div>
      </div>
      <DragOverlay>
        {activeId && activeItem ? <Word id={activeId} type={activeItem.type}>{activeItem.text}</Word> : null}
      </DragOverlay>

      {showNotification && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50">
          {notificationMessage}
        </div>
      )}
    </DndContext>
  );
};