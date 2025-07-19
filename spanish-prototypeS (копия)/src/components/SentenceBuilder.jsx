import React, { useState, useEffect } from 'react';
import { normalizeAnswer } from '../utils/normalization';
import { Input } from './ui/input'; // Импортируем компонент Input
import { Button } from './ui/button';

const SentenceBuilder = ({ title, tasks, onCheck }) => {
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
            setUserAnswers({ ...userAnswers, [taskId]: value });
        }
    };

    const checkAnswers = () => {
        const newResults = { ...results };
        let correctInThisCheck = 0;
        let totalInThisCheck = 0;

        tasks.forEach(task => {
            if (userAnswers[task.id] !== undefined && results[task.id] === undefined) {
                totalInThisCheck++;
                const userAnswer = normalizeAnswer(userAnswers[task.id] || "");
                const correctAnswer = normalizeAnswer(task.correct);
                const isCorrect = userAnswer === correctAnswer;

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

    const allTasksChecked = tasks.every(task => results[task.id] !== undefined);

    return (
        <div className="exercise-block mb-10 p-5 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">{title}</h3>
            {tasks.map((task, index) => {
                const isChecked = results[task.id] !== undefined;
                const isCorrect = results[task.id];

                return (
                    <div key={task.id} className="mb-4 pb-2 border-b border-gray-200">
                        <p className="mb-2">
                            {/* "Умная" нумерация */}
                            {!/^\s*\d+\.\s*/.test(task.prefix) && (
                                <b className="font-semibold">{index + 1}. </b>
                            )}
                            <b className="font-semibold">Исходная фраза:</b>
                            <span className="ml-1"> {task.prefix}</span>
                            <span className="bg-amber-100 border-b-2 border-amber-400 px-1 py-0.5 rounded-sm">
                                {task.highlight}
                            </span>
                            <span>{task.suffix}</span>
                        </p>
                        <Input
                            type="text"
                            placeholder="Введите сюда исправленное предложение..."
                            className={"w-full " + (isChecked ? (isCorrect ? "border-green-500" : "border-red-500") : "")}
                            onChange={(e) => handleInputChange(task.id, e.target.value)}
                            readOnly={isChecked}
                        />
                        {isChecked && (
                            <p className={"font-bold mt-2 " + (isCorrect ? "text-green-600" : "text-red-600")}>
                                {isCorrect ? '✔ Верно!' : `✖ Неверно. Правильный ответ: ${task.correct}`}
                            </p>
                        )}
                    </div>
                );
            })}
            <Button onClick={checkAnswers} disabled={allTasksChecked} variant="check" size="sm" className="mt-5">Проверить</Button>
        </div>
    );
};

export default SentenceBuilder;

