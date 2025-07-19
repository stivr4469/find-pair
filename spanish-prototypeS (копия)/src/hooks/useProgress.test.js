// src/hooks/useProgress.test.js
import { renderHook, act } from '@testing-library/react';
import { useProgress } from './useProgress';

// Мокируем Firebase
jest.mock('../firebase', () => ({
  db: jest.fn(),
  auth: jest.fn(),
  googleProvider: jest.fn(),
}));

// Мокируем функции Firestore
jest.mock('firebase/firestore', () => ({
  doc: (db, collection, id) => ({
      _path: { segments: [collection, id] }, // Добавляем путь для идентификации
  }),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));
const { getDoc, setDoc, doc } = require('firebase/firestore');


describe('Хук useProgress', () => {
  beforeEach(() => {
    // Сбрасываем моки перед каждым тестом
    getDoc.mockClear();
    setDoc.mockClear();
  });

  test('должен загружать и предоставлять начальный прогресс для нового пользователя', async () => {
    getDoc.mockResolvedValue({ exists: () => false }); // Имитируем нового пользователя

    const { result } = renderHook(() => useProgress('new-user-id'));

    await act(async () => {}); // Даем время на выполнение эффекта

    expect(result.current.loadingProgress).toBe(false);
    expect(result.current.progress.totalXP).toBe(0);
    expect(result.current.progress.streak.count).toBe(0);
    expect(setDoc).toHaveBeenCalled(); // Проверяем, что создается запись для нового пользователя
  });

  test('должен добавлять очки (XP)', async () => {
    const initialProgress = { totalXP: 100, lessonScores: {}, streak: { count: 1, lastSessionDate: null } };
    getDoc.mockResolvedValue({ exists: () => true, data: () => initialProgress });

    const { result } = renderHook(() => useProgress('existing-user-id'));
    
    await act(async () => {});

    act(() => {
      result.current.addXP(50);
    });

    expect(result.current.progress.totalXP).toBe(150);
    // Проверяем, что setDoc вызывается с правильными данными
    const expectedDocRef = doc(null, 'progress', 'existing-user-id');
    const expectedProgress = expect.objectContaining({ totalXP: 150 });
    expect(setDoc).toHaveBeenCalledWith(expectedDocRef, expectedProgress, { merge: true });
  });

  test('должен сохранять лучший результат урока', async () => {
     const initialProgress = { totalXP: 100, lessonScores: { 'U1': 1 }, streak: { count: 1, lastSessionDate: null } };
    getDoc.mockResolvedValue({ exists: () => true, data: () => initialProgress });

    const { result } = renderHook(() => useProgress('existing-user-id'));
    
    await act(async () => {});
    
    // Попытка сохранить худший результат
    act(() => {
      result.current.saveLessonResult('U1', 0);
    });
    expect(result.current.progress.lessonScores['U1']).toBe(1);

    // Сохранение лучшего результата
    act(() => {
      result.current.saveLessonResult('U1', 3);
    });
    expect(result.current.progress.lessonScores['U1']).toBe(3);
    const expectedDocRef = doc(null, 'progress', 'existing-user-id');
    const expectedProgress = expect.objectContaining({ lessonScores: { 'U1': 3 } });
    expect(setDoc).toHaveBeenCalledWith(expectedDocRef, expectedProgress, { merge: true });
  });
});
