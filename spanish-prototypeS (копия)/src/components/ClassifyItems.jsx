import React, { useState, useEffect } from 'react';

import { Button } from './ui/button';

const ClassifyItems = ({ title, columns, items, onCheck }) => {
    const [assignments, setAssignments] = useState({});
    const [results, setResults] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setAssignments({});
        setResults({});
        setSelectedItem(null);
    }, [items]);

    if (!items || !columns || !Array.isArray(items) || !Array.isArray(columns)) {
        return null;
    }

    const handleItemClick = (word) => {
        if (results[word] !== undefined) return;
        setSelectedItem(word);
    };

    const handleColumnClick = (columnId) => {
        if (!selectedItem) return;
        setAssignments(prev => ({ ...prev, [selectedItem]: columnId }));
        setSelectedItem(null);
    };

    const checkAnswers = () => {
        const newResults = {};
        let correctInThisCheck = 0;
        let totalInThisCheck = 0;

        items.forEach(({ word, correctColumn }) => {
            if (assignments[word] && results[word] === undefined) {
                totalInThisCheck++;
                const isCorrect = assignments[word] === correctColumn;
                if (isCorrect) correctInThisCheck++;
                newResults[word] = isCorrect;
            }
        });

        setResults(prev => ({ ...prev, ...newResults }));

        if (totalInThisCheck > 0 && onCheck) {
            onCheck({ total: totalInThisCheck, correct: correctInThisCheck });
        }
    };

    const allItemsChecked = items.every(item => results[item.word] !== undefined);

    return (
        <div className="exercise-block mb-10 p-5 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">{title}</h3>

            <div
                className="word-bank"
                style={{
                    marginBottom: '20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    minHeight: '40px',
                    border: '1px solid #eee',
                    padding: '10px',
                    borderRadius: '6px',
                    backgroundColor: '#fafafa'
                }}
            >
                {items.filter(item => !assignments[item.word]).map(item => (
                    <button
                        key={item.word}
                        onClick={() => handleItemClick(item.word)}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: selectedItem === item.word ? '2px solid #007bff' : '1px solid #ccc',
                            backgroundColor: selectedItem === item.word ? '#e7f1ff' : '#fff',
                            cursor: results[item.word] !== undefined ? 'not-allowed' : 'pointer'
                        }}
                        disabled={results[item.word] !== undefined}
                    >
                        {item.word}
                    </button>
                ))}
            </div>

            <div className="columns" style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                {columns.map(col => (
                    <div
                        key={col.id}
                        onClick={() => handleColumnClick(col.id)}
                        style={{
                            flex: 1,
                            border: '2px dashed #ccc',
                            padding: '10px',
                            minHeight: '120px',
                            cursor: 'pointer',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '6px'
                        }}
                    >
                        <h4 style={{ marginTop: 0 }}>{col.title}</h4>
                        {items.filter(item => assignments[item.word] === col.id).map(item => {
                            const isChecked = results[item.word] !== undefined;
                            const isCorrect = results[item.word];
                            const correctColTitle = columns.find(c => c.id === item.correctColumn)?.title;

                            return (
                                <div
                                    key={item.word}
                                    style={{
                                        padding: '6px 8px',
                                        margin: '4px 0',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        backgroundColor: isChecked
                                            ? (isCorrect ? '#d4edda' : '#f8d7da')
                                            : '#e9ecef',
                                        color: isChecked
                                            ? (isCorrect ? '#155724' : '#721c24')
                                            : '#333'
                                    }}
                                >
                                    {item.word}
                                    {isChecked && !isCorrect && (
                                        <span style={{ fontWeight: 'normal', marginLeft: '5px', fontSize: '90%' }}>
                                            (→ {correctColTitle})
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <Button onClick={checkAnswers} disabled={allItemsChecked} variant="check" size="sm" className="mt-5">Проверить</Button>
        </div>
    );
};

export default ClassifyItems;

