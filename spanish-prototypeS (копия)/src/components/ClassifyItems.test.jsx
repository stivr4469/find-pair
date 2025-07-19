import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClassifyItems from './ClassifyItems';

const mockProps = {
  title: 'Тест классификации',
  columns: [
    { id: 'el', title: 'EL...' },
    { id: 'la', title: 'LA...' },
  ],
  items: [
    { word: 'cine', correctColumn: 'el' },
    { word: 'casa', correctColumn: 'la' },
    { word: 'cama', correctColumn: 'la' },
  ],
};

describe('Компонент ClassifyItems', () => {
  test('отображает слова и колонки', () => {
    render(<ClassifyItems {...mockProps} />);
    expect(screen.getByText('Тест классификации')).toBeInTheDocument();
    expect(screen.getByText('EL...')).toBeInTheDocument();
    expect(screen.getByText('LA...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'cine' })).toBeInTheDocument();
  });

  test('перемещает слово в колонку по клику', () => {
    render(<ClassifyItems {...mockProps} />);
    const wordButton = screen.getByRole('button', { name: 'casa' });
    const columnTarget = screen.getByText('LA...').parentElement;

    fireEvent.click(wordButton);
    fireEvent.click(columnTarget);

    // Проверяем, что слово появилось в колонке
    expect(within(columnTarget).getByText('casa')).toBeInTheDocument();
    // Проверяем, что кнопка со словом исчезla из банка слов
    expect(screen.queryByRole('button', { name: 'casa' })).not.toBeInTheDocument();
  });

  test('правильно проверяет ответы и показывает фидбэк', () => {
    render(<ClassifyItems {...mockProps} />);
    
    const columnLa = screen.getByText('LA...').parentElement;

    // Правильное распределение
    fireEvent.click(screen.getByRole('button', { name: 'casa' }));
    fireEvent.click(columnLa);
    
    // Неправильное распределение
    fireEvent.click(screen.getByRole('button', { name: 'cine' }));
    fireEvent.click(columnLa);

    fireEvent.click(screen.getByRole('button', { name: /проверить/i }));

    // Проверяем правильный ответ (зеленый фон)
    expect(within(columnLa).getByText('casa')).toHaveStyle('background-color: #d4edda');
    
    // Проверяем неправильный ответ (красный фон)
    const incorrectItem = within(columnLa).getByText('cine');
    expect(incorrectItem).toHaveStyle('background-color: #f8d7da');
    
    // Проверяем текст подсказки
    expect(incorrectItem).toHaveTextContent('cine (→ EL...)');
  });
});
