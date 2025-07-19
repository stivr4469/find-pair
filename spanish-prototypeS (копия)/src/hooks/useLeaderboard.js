import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export const useLeaderboard = (userId) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Не загружаем данные для гостя
    if (!userId || userId === 'guest') {
      setLoading(false);
      return;
    }

    const fetchLeaderboard = async () => {
      try {
        const progressQuery = query(
          collection(db, 'progress'),
          orderBy('totalXP', 'desc'),
          limit(10)
        );
        const progressSnapshot = await getDocs(progressQuery);
        const progressData = progressSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = {};
        usersSnapshot.forEach(doc => {
          usersData[doc.id] = doc.data();
        });

        const combinedData = progressData.map(progressItem => {
          const user = usersData[progressItem.id];
          return {
            ...progressItem,
            displayName: user ? user.displayName : 'Анонимный игрок',
            photoURL: user ? user.photoURL : null,
          };
        });

        setLeaderboard(combinedData);
      } catch (err) {
        console.error("Ошибка загрузки таблицы лидеров:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [userId]);

  return { leaderboard, loading, error };
};
