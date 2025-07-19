import React, { useState, useEffect } from 'react';
import { normalizeAnswer } from '../utils/normalization';
import AudioPlayer from './AudioPlayer';
import { Input } from './ui/input'; // Импортируем компонент Input
import { Button } from './ui/button';

const FillInTheBlank = ({ title, tasks, content, onCheck }) => {
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
            <h3 className="text-xl font-bold" dangerouslySetInnerHTML={{ __html: title }} />
            {content && (
                <div className="word-bank-container">
                    {content.map((item, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} style={{ margin: 0 }} />
                    ))}
                </div>
            )}
            {tasks.map((task, index) => {
                const isChecked = results[task.id] !== undefined;
                const isCorrect = results[task.id];
                
                let parts = task.sentence.split('___');
                // Если разделитель не найден, считаем, что поле ввода должно быть в конце.
                if (parts.length === 1) {
                    parts.push('');
                }

                const isShortAnswer = task.answer.split('/')[0].length <= 5;
                const inputClassName = isShortAnswer ? "w-32" : "flex-1";

                return (
                    <div key={task.id} className="grid grid-cols-[1fr_auto] items-center gap-x-2 mb-2">
                        <div className="task-content flex items-center flex-wrap">
                            {/* "Умная" нумерация: добавляем номер, только если его нет в предложении */}
                            {!/^\s*\d+\.\s*/.test(task.sentence) && (
                                <span className="mr-2">{`${index + 1}.`}</span>
                            )}
                            {parts.map((part, partIndex) => (
                                <React.Fragment key={partIndex}>
                                    <span dangerouslySetInnerHTML={{ __html: part.trim() }} />
                                    {partIndex < parts.length - 1 && (
                                        <Input
                                            type="text"
                                            className={`${inputClassName} h-5 inline-block mx-2 ` + (isChecked ? (isCorrect ? "border-green-500" : "border-red-500") : "")}
                                            onChange={(e) => handleInputChange(task.id, e.target.value)}
                                            readOnly={isChecked}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="flex items-center space-x-2">
                            <AudioPlayer textToSpeak={task.speechText || task.sentence} />
                            {isChecked && (
                                <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect ? ' ✔ Правильно!' : ` ✖ Ответ: ${task.answer.split('/')[0]}`}
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

export default FillInTheBlank;
