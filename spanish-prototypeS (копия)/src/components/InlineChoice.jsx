import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import { Button } from './ui/button';

const InlineChoice = ({ title, tasks, onCheck }) => {
    const [userSelections, setUserSelections] = useState({});
    const [results, setResults] = useState({});

    useEffect(() => {
        setUserSelections({});
        setResults({});
    }, [tasks]);

    if (!tasks || !Array.isArray(tasks)) {
        return null;
    }

    const handleSelect = (taskId, choiceIndex, option) => {
        if (results[taskId] === undefined) {
            setUserSelections(prev => ({
                ...prev,
                [taskId]: {
                    ...(prev[taskId] || {}),
                    [choiceIndex]: option,
                },
            }));
        }
    };

    const checkAnswers = () => {
        const newResults = { ...results };
        let correctInThisCheck = 0;
        let totalInThisCheck = 0;

        tasks.forEach(task => {
            const userChoices = userSelections[task.id] || {};
            if (Object.keys(userChoices).length > 0 && newResults[task.id] === undefined) {
                totalInThisCheck++;
                const correctAnswers = Array.isArray(task.correctOptions) 
                    ? task.correctOptions 
                    : (task.correctOption ? task.correctOption.split(',').map(s => s.trim()) : []);

                const isCorrect = correctAnswers.every((opt, i) => userChoices[i] === opt);
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

    const renderTask = (task) => {
        const correctAnswers = Array.isArray(task.correctOptions) 
            ? task.correctOptions 
            : (task.correctOption ? task.correctOption.split(',').map(s => s.trim()) : []);

        const parts = task.sentence.split(/(\([^)]+\))/g);
        const elements = [];
        let choiceIndex = 0;
        const isTaskChecked = results[task.id] !== undefined;

        parts.forEach((part, index) => {
            const match = part.match(/\((.*?)\)/);
            if (match) {
                const options = match[1].split('/');
                const currentChoiceIndex = choiceIndex;
                elements.push(
                    <span key={`choice-${index}`} className="inline-block mx-1">
                        {options.map((option, optIndex) => {
                            const isSelected = userSelections[task.id]?.[currentChoiceIndex] === option;
                            let className = 'choice-option border border-gray-400 px-3 py-1 text-sm text-gray-800 h-auto leading-none align-middle rounded';
                            
                            if (isTaskChecked) {
                                if (correctAnswers[currentChoiceIndex] && option === correctAnswers[currentChoiceIndex]) {
                                    className += ' bg-green-200 border-green-500 text-green-800';
                                } else if (isSelected) {
                                    className += ' bg-red-200 border-red-500 text-red-800';
                                } else {
                                    className += ' bg-gray-100 text-gray-400 cursor-not-allowed';
                                }
                            } else if (isSelected) {
                                className += ' bg-blue-500 text-white';
                            }

                            return (
                                <button
                                    key={optIndex}
                                    className={className}
                                    onClick={() => handleSelect(task.id, currentChoiceIndex, option)}
                                    disabled={isTaskChecked}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </span>
                );
                choiceIndex++;
            } else {
                elements.push(<span key={`text-${index}`}>{part}</span>);
            }
        });
        return elements;
    };

    const renderFeedback = (task) => {
        const correctAnswers = Array.isArray(task.correctOptions) 
            ? task.correctOptions 
            : (task.correctOption ? task.correctOption.split(',').map(s => s.trim()) : []);

        const parts = task.sentence.split(/(\(.*?\))/g);
        const elements = [];
        let choiceIndex = 0;
        
        parts.forEach((part, index) => {
            const match = part.match(/\((.*?)\)/);
            if (match) {
                elements.push(
                    <strong key={`ans-${index}`} style={{ margin: '0 3px' }}>
                        {correctAnswers[choiceIndex] || 'N/A'}
                    </strong>
                );
                choiceIndex++;
            } else {
                elements.push(<span key={`text-${index}`}>{part}</span>);
            }
        });
        return elements;
    };

    const allTasksChecked = tasks.every(task => results[task.id] !== undefined);

    return (
        <div className="exercise-block mb-10 p-5 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">{title}</h3>
            {tasks.map((task, index) => {
                const isCorrect = results[task.id];

                return (
                    <div key={task.id} className="mb-4">
                        <div className="flex items-center flex-wrap">
                            {!/^\s*\d+\.\s*/.test(task.sentence) && (
                                <span className="mr-2.5">{`${index + 1}.`}</span>
                            )}
                            {renderTask(task)}
                        </div>
                        {isCorrect === false && (
                            <div className="mt-1.5 text-sm text-green-600">
                                <strong>Правильный ответ:</strong> {renderFeedback(task)}
                            </div>
                        )}
                    </div>
                );
            })}
            <Button onClick={checkAnswers} disabled={allTasksChecked} variant="check" size="sm" className="mt-5">Проверить</Button>
        </div>
    );
};

export default InlineChoice;
