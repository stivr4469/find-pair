// src/components/MultipleChoice.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultipleChoice from './MultipleChoice';

const mockTasks = [
  { id: 't1', sentence: '¿Cuál es correcto?', options: ['Soy', 'Estoy'], correctOption: 'Estoy' },
  { id: 't2', sentence: '¿Y aquí?', options: ['es', 'está'], correctOption: 'está' }
];

describe('Компонент MultipleChoice', () => {
  test('корректно отображает заголовок и задания', () => {
    render(<MultipleChoice title="Тестовое задание" tasks={mockTasks} />);
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText(/¿Cuál es correcto?/)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5); // 2*2 options + check button
  });

  test('позволяет выбрать ответ и подсвечивает его', () => {
    render(<MultipleChoice title="Тест" tasks={mockTasks} />);
    const optionButton = screen.getAllByRole('button', { name: 'Soy' })[0];
    fireEvent.click(optionButton);
    expect(optionButton).toHaveClass('selected');
  });

  test('правильно определяет верный ответ', () => {
    render(<MultipleChoice title="Тест" tasks={mockTasks} />);
    const correctButton = screen.getAllByRole('button', { name: 'Estoy' })[0];
    fireEvent.click(correctButton);
    fireEvent.click(screen.getByRole('button', { name: /проверить/i }));
    expect(correctButton).toHaveClass('correct');
  });

  test('правильно определяет неверный ответ', () => {
    render(<MultipleChoice title="Тест" tasks={mockTasks} />);
    const incorrectButton = screen.getAllByRole('button', { name: 'Soy' })[0];
    fireEvent.click(incorrectButton);
    fireEvent.click(screen.getByRole('button', { name: /проверить/i }));
    expect(incorrectButton).toHaveClass('incorrect');
    expect(screen.getByText(/Правильный ответ: Estoy/)).toBeInTheDocument();
  });

  test('вызывает onCheck с правильным результатом', () => {
    const onCheckMock = jest.fn();
    render(<MultipleChoice title="Тест" tasks={mockTasks} onCheck={onCheckMock} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Estoy' })[0]); // Правильный
    fireEvent.click(screen.getAllByRole('button', { name: 'es' })[0]);    // Неправильный
    fireEvent.click(screen.getByRole('button', { name: /проверить/i }));
    expect(onCheckMock).toHaveBeenCalledWith({ total: 2, correct: 1 });
  });
});
