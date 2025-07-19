import React, { useState, useEffect } from 'react';
import { normalizeAnswer } from '../utils/normalization';
import { Input } from './ui/input'; // Импортируем компонент Input
import { Button } from './ui/button';

const FillFromBank = ({ title, wordBank, tasks, onCheck }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState({});

    useEffect(() => {
        setUserAnswers({});
        setResults({});
    }, [tasks]);

    if (!tasks || !Array.isArray(tasks) || !wordBank) {
        return null;
    }

    const handleInputChange = (taskId, inputIndex, value) => {
        if (results[taskId] === undefined) {
            const currentTaskAnswers = userAnswers[taskId] || [];
            const newTaskAnswers = [...currentTaskAnswers];
            newTaskAnswers[inputIndex] = value.trim();
            setUserAnswers({ ...userAnswers, [taskId]: newTaskAnswers });
        }
    };

    const checkAnswers = () => {
        const newResults = { ...results };
        let correctInThisCheck = 0;
        let totalInThisCheck = 0;

        tasks.forEach(task => {
            const taskUserAnswers = userAnswers[task.id] || [];

            if (taskUserAnswers.length > 0 && results[task.id] === undefined) {
                totalInThisCheck++;

                const correct = task.answers.map(normalizeAnswer);
                const student = taskUserAnswers.map(normalizeAnswer);

                const isCorrect = JSON.stringify(correct) === JSON.stringify(student);

                if (isCorrect) {
                    correctInThisCheck++;
                }

                newResults[task.id] = isCorrect;
            }
        });

        setResults(newResults);

        if (totalInThisCheck > 0 && onCheck) {
            onCheck({ total: totalInThisCheck, correct: correctInThisCheck });
        }
    };

    const renderSentenceWithInputs = (task) => {
        const parts = task.sentence.split('___');
        const isTaskChecked = results[task.id] !== undefined;
        const isCorrect = results[task.id];

        return (
            <div className="flex items-center flex-wrap">
                {parts.map((part, index) => {
                    const borderColorClass = isTaskChecked ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-gray-300';

                    return (
                        <React.Fragment key={index}>
                            <span>{part}</span>
                            {index < parts.length - 1 && (
                                <Input
                                    type="text"
                                    className={`w-32 h-5 inline-block mx-2 ${borderColorClass}`}
                                    onChange={(e) => handleInputChange(task.id, index, e.target.value)}
                                    readOnly={isTaskChecked}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    const allTasksChecked = tasks.every(task => results[task.id] !== undefined);

    return (
        <div className="exercise-block mb-10 p-5 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">{title}</h3>

            {wordBank && (
                <div className="border border-gray-300 p-2 mb-4 flex flex-wrap gap-2 rounded-md">
                    {wordBank.nouns && wordBank.nouns.map(word => (
                        <span key={word} className="bg-gray-200 px-2 py-1 rounded-sm text-sm">
                            {word}
                        </span>
                    ))}
                    {wordBank.adjectives && wordBank.adjectives.length > 0 && (
                        <>
                            <div className="w-full h-1"></div>
                            {wordBank.adjectives.map(word => (
                                <span key={word} className="bg-gray-200 px-2 py-1 rounded-sm text-sm">
                                    {word}
                                </span>
                            ))}
                        </>
                    )}
                </div>
            )}

            {tasks.map((task, index) => {
                const isCorrect = results[task.id];
                const isChecked = results[task.id] !== undefined;

                return (
                    <div key={task.id} className="mb-4">
                        <div className="flex items-center flex-wrap">
                            <span className="mr-2">{`${index + 1}.`}</span>
                            {renderSentenceWithInputs(task)}
                            {isChecked && (
                                <span className={`font-bold ml-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect ? '✔' : `✖ (Ответ: ${task.answers.join(' ')})`}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
            <Button onClick={checkAnswers} disabled={allTasksChecked} variant="check" size="sm" className="mt-5">Проверить</Button>
        </div>
    );
};

export default FillFromBank;
