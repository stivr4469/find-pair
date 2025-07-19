import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Мокаем (симулируем) хуки, чтобы изолировать компонент App от внешних зависимостей.
jest.mock('./hooks/useAuth', () => ({
  useAuth: () => ({
    user: null, // Изначально пользователь не вошел в систему
    loading: false, // Загрузка завершена
  }),
}));

jest.mock('./hooks/useProgress', () => ({
  useProgress: () => ({
    progress: { // Предоставляем базовый объект прогресса
      lessonScores: {},
      totalXP: 0,
      streak: { count: 0, lastSessionDate: null },
    },
    loadingProgress: false, // Загрузка прогресса завершена
  }),
}));

// Описываем тестовый набор для компонента App
describe('Компонент App', () => {
  // Тест проверяет, что при отсутствии пользователя отображается экран приветствия.
  // `async` и `waitFor` используются для корректной обработки асинхронных обновлений состояния.
  test('отображает экран приветствия для неавторизованного пользователя', async () => {
    render(<App />);

    // Мы ждем, пока все асинхронные эффекты в компоненте завершатся,
    // и проверяем, что на экране появился заголовок "¡Hola!".
    await waitFor(() => {
      expect(screen.getByText(/¡Hola!/i)).toBeInTheDocument();
    });

    // Дополнительно проверяем наличие ключевых кнопок
    expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Зарегистрироваться/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Продолжить как гость/i })).toBeInTheDocument();
  });
});
