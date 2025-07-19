import React, { useState, useEffect } from 'react';
import { normalizeAnswer } from '../utils/normalization';
import { Button } from './ui/button';

const DescribeImage = ({ title, imageUrl, tasks, onCheck }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState({});

    useEffect(() => {
        setUserAnswers({});
        setResults({});
    }, [tasks]);

    if (!tasks || !Array.isArray(tasks)) {
        return null;
    }

    const handleInputChange = (taskId, value) => {
        if (results[taskId] === undefined) {
            setUserAnswers({ ...userAnswers, [taskId]: value.trim() });
        }
    };

    const checkAnswers = () => {
        const newResults = { ...results };
        let correctInThisCheck = 0;
        let totalInThisCheck = 0;

        tasks.forEach(task => {
            if (userAnswers[task.id] !== undefined && results[task.id] === undefined) {
                totalInThisCheck++;
                const rawAnswer = typeof task.answer === 'string' ? task.answer : '';
                const normalizedCorrectAnswers = rawAnswer.toLowerCase().split('/').map(a => normalizeAnswer(a));
                const normalizedUserAnswer = normalizeAnswer(userAnswers[task.id] || "");
                const isCorrect = normalizedCorrectAnswers.includes(normalizedUserAnswer);

                if (isCorrect) correctInThisCheck++;
                newResults[task.id] = isCorrect;
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
            {imageUrl && (
                <div className="image-container">
                    <img src={imageUrl} alt={title} className="max-w-full h-auto" />
                </div>
            )}
            {startPhrase && <p>{startPhrase}</p>}
            {wordBank && (
                <div className="word-bank flex flex-wrap gap-2 mb-4">
                    {wordBank.map((word, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded-sm text-sm">
                            {word}
                        </span>
                    ))}
                </div>
            )}
            {tasks.map((task, index) => {
                const isChecked = results[task.id] !== undefined;
                const isCorrect = results[task.id];

                return (
                    <div key={task.id} className="exercise-task flex items-center mb-2">
                        <div className="task-content flex items-center">
                            <span className="mr-2">{`${index + 1}. `}</span>
                            <Input
                                type="text"
                                className={`w-64 h-5 inline-block mx-2 ${isChecked ? (isCorrect ? 'border-green-500' : 'border-red-500') : ''}`}
                                onChange={(e) => handleInputChange(task.id, e.target.value)}
                                readOnly={isChecked}
                                placeholder="Введите описание"
                            />
                        </div>
                        {isChecked && (
                            <span className={`font-bold ml-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {isCorrect ? ' ✔ Правильно!' : ` ✖ Правильный ответ: ${task.answer.split('/')[0]}`}
                            </span>
                        )}
                    </div>
                );
            })}
            <Button onClick={checkAnswers} disabled={allTasksChecked} variant="check" size="sm" className="mt-5">Проверить</Button>
        </div>
    );
};

export default DescribeImage;
