import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const MultipleChoice = ({ title, tasks, onCheck }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [results, setResults] = useState({});

    useEffect(() => {
        setSelectedAnswers({});
        setResults({});
    }, [tasks]);

    if (!tasks || !Array.isArray(tasks)) {
        return null;
    }

    const handleSelect = (taskId, option) => {
        if (results[taskId] === undefined) {
            setSelectedAnswers(prev => ({ ...prev, [taskId]: option }));
        }
    };

    const checkAnswers = () => {
        const newResults = { ...results };
        let correctInThisCheck = 0;
        let totalInThisCheck = 0;

        tasks.forEach(task => {
            if (selectedAnswers[task.id] && results[task.id] === undefined) {
                totalInThisCheck++;
                const isCorrect = selectedAnswers[task.id] === task.correctOption;
                newResults[task.id] = isCorrect;
                if (isCorrect) {
                    correctInThisCheck++;
                }
            }
        });
        
        setResults(newResults);

        if (totalInThisCheck > 0 && onCheck) {
            onCheck({ total: totalInThisCheck, correct: correctInThisCheck });
        }
    };

    const allTasksChecked = tasks.every(task => results[task.id] !== undefined);

    return (
        <div className="exercise-block mb-10 p-5 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">{title}</h3>
            {tasks.map((task, index) => {
                const isChecked = results[task.id] !== undefined;
                const isCorrect = results[task.id];

                return (
                    <div key={task.id} className="mb-5 pb-2.5 border-b border-gray-200">
                        {/* "Умная" нумерация */}
                        <p className="font-medium">
                            {!/^\s*\d+\.\s*/.test(task.sentence) ? `${index + 1}. ` : ''}
                            {task.sentence}
                        </p>
                        <div className="mb-1.5">
                            {task.options.map(option => {
                                const isSelected = selectedAnswers[task.id] === option;
                                let className = 'choice-option border border-gray-400 w-16 text-center rounded-md mr-2 mb-2';
                                
                                if (isChecked) {
                                    if (option === task.correctOption) {
                                        // Правильный ответ всегда зеленый
                                        className += ' bg-green-200 border-green-500 text-green-800';
                                    } else if (isSelected) {
                                        // Выбранный неправильный ответ - красный
                                        className += ' bg-red-200 border-red-500 text-red-800';
                                    } else {
                                        // Остальные (неправильные и невыбранные) - неактивные
                                        className += ' bg-gray-100 text-gray-400 cursor-not-allowed';
                                    }
                                } else if (isSelected) {
                                    // Выбранный до проверки - синий
                                    className += ' bg-blue-500 text-white';
                                }

                                return (
                                    <button
                                        key={option}
                                        className={className}
                                        onClick={() => handleSelect(task.id, option)}
                                        disabled={isChecked}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                        {isChecked && (
                            <p className={`text-sm font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                {isCorrect ? '✔' : '✖'} {task.feedback || (isCorrect ? 'Правильно!' : `Правильный ответ: ${task.correctOption}`)}
                            </p>
                        )}
                    </div>
                );
            })}
            <Button onClick={checkAnswers} disabled={allTasksChecked} variant="check" size="sm" className="mt-5">Проверить</Button>
        </div>
    );
};

export default MultipleChoice;
