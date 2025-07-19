import React, { useState, useEffect } from 'react';
import { normalizeAnswer } from '../utils/normalization';
import { Input } from './ui/input'; // Импортируем компонент Input
import { Button } from './ui/button';

const FillInTheBlanksComplex = ({ title, tasks, onCheck }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState({});

    useEffect(() => {
        setUserAnswers({});
        setResults({});
    }, [tasks]);

    if (!tasks || !Array.isArray(tasks)) {
        return null;
    }

    const handleInputChange = (taskId, inputIndex, value) => {
        if (!results[taskId]) {
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
            if (userAnswers[task.id] && results[task.id] === undefined) {
                totalInThisCheck++;
                const correct = task.answers.map(a => normalizeAnswer(a));
                const student = (userAnswers[task.id] || []).map(a => normalizeAnswer(a));
                const isCorrect = correct.length === student.length && JSON.stringify(correct) === JSON.stringify(student);

                if (isCorrect) correctInThisCheck++;
                newResults[task.id] = isCorrect;
            }
        });

        setResults(newResults);

        if (totalInThisCheck > 0 && onCheck) {
            onCheck({ total: totalInThisCheck, correct: correctInThisCheck });
        }
    };
    
    const allChecked = tasks.every(task => results[task.id] !== undefined);

    const renderTaskInputs = (task, isTaskChecked) => {
        const parts = task.sentence.split('___');
        const elements = [];
        let choiceIndex = 0;

        parts.forEach((part, index) => {
            elements.push(<span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);
            if (index < parts.length - 1) {
                const borderColorClass = isTaskChecked ? (results[task.id] ? 'border-green-500' : 'border-red-500') : 'border-gray-300';
                
                elements.push(
                    <Input
                        key={`input-${task.id}-${index}`}
                        type="text"
                        className={`w-32 h-5 inline-block mx-2 ${borderColorClass}`}
                        onChange={(e) => handleInputChange(task.id, choiceIndex, e.target.value)}
                        readOnly={isTaskChecked}
                    />
                );
                choiceIndex++;
            }
        });
        return elements;
    };

    const renderTaskWithFeedback = (task) => {
        const parts = task.sentence.split('___');
        const elements = [];
        let choiceIndex = 0;
        parts.forEach((part, index) => {
            elements.push(<span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);
            if (index < parts.length - 1) {
                const correctAnswer = task.answers[choiceIndex] || '';
                elements.push(<strong key={`answer-${index}`} className="text-green-600 mx-1">{correctAnswer}</strong>);
                choiceIndex++;
            }
        });
        return elements;
    };

    return (
        <div className="exercise-block mb-10 p-5 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">{title}</h3>
            {tasks.map((task, index) => {
                const isTaskChecked = results[task.id] !== undefined;
                return (
                    <div key={task.id} className="mb-4 pb-2 border-b border-gray-200">
                        <div className="flex items-center flex-wrap min-h-[30px]">
                            {/* "Умная" нумерация */}
                            {!/^\s*\d+\.\s*/.test(task.sentence) && (
                                <span className="mr-2">{`${index + 1}. `}</span>
                            )}
                            {renderTaskInputs(task, isTaskChecked)}
                        </div>
                        {isTaskChecked && !results[task.id] && (
                            <div className="text-green-600 mt-1 text-sm font-bold">
                                <span>Правильно: </span>{renderTaskWithFeedback(task)}
                            </div>
                        )}
                    </div>
                );
            })}
            <Button onClick={checkAnswers} disabled={allChecked} variant="check" size="sm" className="mt-5">Проверить</Button>
        </div>
    );
};

export default FillInTheBlanksComplex;
