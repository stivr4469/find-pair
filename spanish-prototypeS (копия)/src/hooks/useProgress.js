// src/hooks/useProgress.js
import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Начальное состояние для новых пользователей и гостей
const getInitialState = () => ({
  lessonScores: {},
  totalXP: 0,
  streak: { count: 0, lastSessionDate: null },
});

export const useProgress = (userId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция для обновления прогресса в Firestore
  const updateProgressInFirestore = useCallback(async (newProgress) => {
    // Сохраняем только для зарегистрированных пользователей
    if (userId && userId !== 'guest') {
      try {
        const progressRef = doc(db, 'progress', userId);
        await setDoc(progressRef, newProgress, { merge: true });
      } catch (error) {
        console.error("Не удалось сохранить прогресс в Firestore:", error);
      }
    }
  }, [userId]);

  // Загрузка данных при смене пользователя
  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      if (userId && userId !== 'guest') {
        const progressRef = doc(db, 'progress', userId);
        const docSnap = await getDoc(progressRef);
        if (docSnap.exists()) {
          setProgress(docSnap.data());
        } else {
          const initialProgress = getInitialState();
          await setDoc(progressRef, initialProgress);
          setProgress(initialProgress);
        }
      } else {
        // Для гостей или когда пользователь не вошел, просто устанавливаем начальное состояние
        setProgress(getInitialState());
      }
      setLoading(false);
    };

    fetchProgress();
  }, [userId]);
  
  const addXP = useCallback((points) => {
    if (!userId || userId === 'guest' || !progress) return;
    
    setProgress(prev => {
      const newProgress = { ...prev, totalXP: prev.totalXP + points };
      updateProgressInFirestore(newProgress);
      return newProgress;
    });
  }, [userId, progress, updateProgressInFirestore]);
  
  const updateStreak = useCallback(() => {
    if (!userId || userId === 'guest' || !progress) return;

    const today = new Date().toDateString();
    if (progress.streak.lastSessionDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const newCount = progress.streak.lastSessionDate === yesterday.toDateString() 
      ? progress.streak.count + 1 
      : 1;

    setProgress(prev => {
      const newProgress = {
        ...prev,
        streak: { count: newCount, lastSessionDate: today }
      };
      updateProgressInFirestore(newProgress);
      return newProgress;
    });
  }, [userId, progress, updateProgressInFirestore]);

  const saveLessonResult = useCallback((lessonId, stars) => {
    if (!userId || userId === 'guest' || !progress) return;

    const currentStars = progress.lessonScores[lessonId] || 0;
    if (stars > currentStars) {
      setProgress(prev => {
        const newProgress = {
          ...prev,
          lessonScores: { ...prev.lessonScores, [lessonId]: stars },
        };
        updateProgressInFirestore(newProgress);
        return newProgress;
      });
    }
  }, [userId, progress, updateProgressInFirestore]);
  
  return { 
    progress,
    loadingProgress: loading,
    addXP, 
    updateStreak,
    saveLessonResult
  };
};
