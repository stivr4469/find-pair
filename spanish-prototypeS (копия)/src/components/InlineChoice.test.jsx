import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InlineChoice from './InlineChoice';

const mockTasks = [
    {
        id: 'u5_2_1',
        sentence: '–¿Quién es Luis Miguel? –Es (cantante/un cantante); es (mexicano/un mexicano).',
        correctOptions: ['cantante', 'mexicano']
    },
    {
        id: 'u5_2_2',
        sentence: 'La doctora Ramírez es (médica/una médica); es (argentina/una argentina).',
        correctOptions: ['una médica', 'argentina']
    }
];

describe('Компонент InlineChoice', () => {
    test('корректно отображает заголовок и задания', () => {
        render(<InlineChoice title="Тест InlineChoice" tasks={mockTasks} />);
        expect(screen.getByText('Тест InlineChoice')).toBeInTheDocument();
        expect(screen.getByText(/¿Quién es Luis Miguel/)).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: /cantante/i })).toHaveLength(2);
        expect(screen.getAllByRole('button', { name: /mexicano/i })).toHaveLength(2);
    });

    test('позволяет выбрать ответы и подсвечивает их', () => {
        render(<InlineChoice title="Тест" tasks={mockTasks} />);
        const cantanteButton = screen.getByRole('button', { name: 'cantante' });
        const mexicanoButton = screen.getByRole('button', { name: 'mexicano' });

        fireEvent.click(cantanteButton);
        fireEvent.click(mexicanoButton);

        expect(cantanteButton).toHaveClass('selected');
        expect(mexicanoButton).toHaveClass('selected');
    });

    test('правильно определяет верные ответы', () => {
        render(<InlineChoice title="Тест" tasks={mockTasks} />);
        fireEvent.click(screen.getByRole('button', { name: 'cantante' }));
        fireEvent.click(screen.getByRole('button', { name: 'mexicano' }));
        fireEvent.click(screen.getByRole('button', { name: /проверить/i }));

        expect(screen.getByRole('button', { name: 'cantante' })).toHaveClass('correct');
        expect(screen.getByRole('button', { name: 'mexicano' })).toHaveClass('correct');
    });

    test('правильно определяет неверные ответы и показывает подсказку', () => {
        render(<InlineChoice title="Тест" tasks={mockTasks} />);
        // Выбираем неправильные ответы для первого задания
        fireEvent.click(screen.getByRole('button', { name: 'un cantante' }));
        fireEvent.click(screen.getByRole('button', { name: 'un mexicano' }));
        
        // Кликаем "Проверить"
        fireEvent.click(screen.getByRole('button', { name: /проверить/i }));

        // Проверяем, что неправильные ответы подсвечены красным
        expect(screen.getByRole('button', { name: 'un cantante' })).toHaveClass('incorrect');
        expect(screen.getByRole('button', { name: 'un mexicano' })).toHaveClass('incorrect');

        // Проверяем, что правильные ответы подсвечены зеленым
        expect(screen.getByRole('button', { name: 'cantante' })).toHaveClass('correct');
        expect(screen.getByRole('button', { name: 'mexicano' })).toHaveClass('correct');

        // Провер��ем наличие подсказки
        expect(screen.getByText(/Правильный ответ:/)).toBeInTheDocument();
    });

    test('вызывает onCheck с правильным результатом', () => {
        const onCheckMock = jest.fn();
        render(<InlineChoice title="Тест" tasks={mockTasks} onCheck={onCheckMock} />);
        
        // Правильный ответ на первое задание
        fireEvent.click(screen.getByRole('button', { name: 'cantante' }));
        fireEvent.click(screen.getByRole('button', { name: 'mexicano' }));
        
        // Неправильный ответ на второе задание
        fireEvent.click(screen.getByRole('button', { name: 'médica' }));
        fireEvent.click(screen.getByRole('button', { name: 'una argentina' }));

        fireEvent.click(screen.getByRole('button', { name: /проверить/i }));

        expect(onCheckMock).toHaveBeenCalledWith({ total: 2, correct: 1 });
    });
});


// Пример данных для упражнения 5.2
const exercise_5_2_tasks = [
    {
        id: 'u5_2_1',
        sentence: '–¿Quién es Luis Miguel? –Es (cantante/un cantante); es (mexicano/un mexicano).',
        correctOptions: ['cantante', 'mexicano']
    },
    {
        id: 'u5_2_2',
        sentence: 'La doctora Ramírez es (médica/una médica); es (argentina/una argentina).',
        correctOptions: ['una médica', 'argentina']
    },
    {
        id: 'u5_2_3',
        sentence: '–¿Qué es el gazpacho? –Es (sopa/una sopa) fría.',
        correctOptions: ['una sopa']
    },
    {
        id: 'u5_2_4',
        sentence: 'Mi hermano es (profesor/un profesor) de español.',
        correctOptions: ['profesor']
    },
    {
        id: 'u5_2_5',
        sentence: '–¿Qué es esto? –Es (llave/una llave).',
        correctOptions: ['una llave']
    }
];

// Пример данных для упражнения 47.1
const exercise_47_1_tasks = [
    {
        id: 'u47_1_1',
        sentence: '1. (Hay/Está) un paquete para ti.',
        correctOptions: ['Hay']
    },
    {
        id: 'u47_1_2',
        sentence: '2. (Hay/Está) en tu habitación.',
        correctOptions: ['Está']
    },
    {
        id: 'u47_1_3',
        sentence: '3. En mi barrio (hay/está) un cine nuevo.',
        correctOptions: ['hay']
    },
    {
        id: 'u47_1_4',
        sentence: '4. (Hay/Está) al lado de la farmacia.',
        correctOptions: ['Está']
    },
    {
        id: 'u47_1_5',
        sentence: '5. Aquí no (hay/está) ninguna silla para sentarse.',
        correctOptions: ['hay']
    },
    {
        id: 'u47_1_6',
        sentence: '6. –¿(Hay/Está) el director, por favor? –No, no (hay/está).',
        correctOptions: ['Está', 'está']
    },
    {
        id: 'u47_1_7',
        sentence: '7. –¿Dónde (hay/está) un hotel? –(Hay/Está) uno al final de la calle.',
        correctOptions: ['hay', 'Hay']
    }
];

