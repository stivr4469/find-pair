import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FillInTheBlank from './FillInTheBlank';
import { normalizeAnswer } from '../utils/normalization';

jest.mock('../utils/normalization', () => ({
  normalizeAnswer: (text) => {
    if (typeof text !== 'string') return '';
    return text.trim().toLowerCase()
      .replace(/ñ/g, 'n').replace(/[áä]/g, 'a')
      .replace(/[éë]/g, 'e').replace(/[íï]/g, 'i')
      .replace(/[óö]/g, 'o').replace(/[úü]/g, 'u');
  },
}));

const mockTasks = [
  { id: 't1', sentence: '1. El perro ___ en el parque.', answer: 'juega', speechText: 'El perro juega en el parque.' },
  { id: 't2', sentence: '2. Yo ___ español.', answer: 'hablo', speechText: 'Yo hablo español.' },
  { id: 't3', sentence: '3. Las manzanas ___ rojas.', answer: 'son/están', speechText: 'Las manzanas son o están rojas.' },
];

describe('Компонент FillInTheBlank', () => {

  test('корректно отображает заголовок и задания', () => {
    render(<FillInTheBlank title="Тестовое задание" tasks={mockTasks} />);
    
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText(/1. El perro/)).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
  });

  test('позволяет пользователю вводить текст', () => {
    render(<FillInTheBlank title="Тест ввода" tasks={mockTasks} />);
    const input = screen.getAllByRole('textbox')[0];
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(input.value).toBe('test input');
  });

  test('правильно определяет верный ответ', () => {
    render(<FillInTheBlank title="Тест верного ответа" tasks={mockTasks} />);
    const input = screen.getAllByRole('textbox')[0];
    const checkButton = screen.getByRole('button', { name: /проверить/i });

    fireEvent.change(input, { target: { value: 'juega' } });
    fireEvent.click(checkButton);

    expect(input).toHaveClass('correct-border');
    expect(screen.getByText('✔ Правильно!')).toBeInTheDocument();
  });

  test('правильно определяет неверный ответ и показывает подсказку', () => {
    render(<FillInTheBlank title="Тест неверного ответа" tasks={mockTasks} />);
    const input = screen.getAllByRole('textbox')[0];
    const checkButton = screen.getByRole('button', { name: /проверить/i });

    fireEvent.change(input, { target: { value: 'corre' } });
    fireEvent.click(checkButton);

    expect(input).toHaveClass('incorrect-border');
    expect(screen.getByText(/✖ Ответ: juega/)).toBeInTheDocument();
  });

  test('не чувствителен к регистру и пробелам', () => {
    render(<FillInTheBlank title="Тест нормализации" tasks={mockTasks} />);
    const input = screen.getAllByRole('textbox')[0];
    const checkButton = screen.getByRole('button', { name: /проверить/i });

    fireEvent.change(input, { target: { value: '  JUEGA  ' } });
    fireEvent.click(checkButton);

    expect(input).toHaveClass('correct-border');
  });

  test('поддерживает несколько правильных ответов через /', () => {
    render(<FillInTheBlank title="Тест нескольких ответов" tasks={mockTasks} />);
    const input = screen.getAllByRole('textbox')[2];
    const checkButton = screen.getByRole('button', { name: /проверить/i });

    fireEvent.change(input, { target: { value: 'están' } });
    fireEvent.click(checkButton);
    
    expect(input).toHaveClass('correct-border');
  });

  test('блокирует поля и кнопку после проверки', () => {
    render(<FillInTheBlank title="Тест блокировки" tasks={mockTasks} />);
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'juega' } });
    const checkButton = screen.getByRole('button', { name: /проверить/i });
    fireEvent.click(checkButton);

    expect(checkButton).toBeDisabled();
    screen.getAllByRole('textbox').forEach(input => {
      expect(input).toHaveAttribute('readonly');
    });
  });

  test('вызывает onCheck с правильным количеством очков', () => {
    const onCheckMock = jest.fn();
    render(<FillInTheBlank title="Тест колбэка" tasks={mockTasks} onCheck={onCheckMock} />);

    // Ответы: 1-й правильный, 2-й неправильный, 3-й правильный
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'juega' } });
    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'incorrecto' } });
    fireEvent.change(screen.getAllByRole('textbox')[2], { target: { value: 'son' } });

    fireEvent.click(screen.getByRole('button', { name: /проверить/i }));

    expect(onCheckMock).toHaveBeenCalledTimes(1);
    expect(onCheckMock).toHaveBeenCalledWith({ total: 3, correct: 2 });
  });
});
