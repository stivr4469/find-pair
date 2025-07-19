import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

// Предполагаем, что words.json находится в src/data/
import wordsData from '../data/findPairData.json'; // Используем существующий findPairData.json

const FindPairGameVanilla = ({ onBack, addXP }) => {
    const [gameOptions, setGameOptions] = useState({ category: 'verbs', count: 10 });
    const [pairs, setPairs] = useState([]);
    const [leftWords, setLeftWords] = useState([]);
    const [rightWords, setRightWords] = useState([]);
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [selectedRight, setSelectedRight] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameResult, setGameResult] = useState(null);

    const initGame = useCallback(() => {
        const { category, count } = gameOptions;
        const selectedCategory = wordsData[category] || [];
        
        let gamePairs = [...selectedCategory].sort(() => 0.5 - Math.random()).slice(0, count);

        setPairs(gamePairs);
        setLeftWords(gamePairs.map(p => ({ value: p.ru, match: p.es })));
        setRightWords(gamePairs.map(p => ({ value: p.es, match: p.ru })).sort(() => 0.5 - Math.random()));

        setSelectedLeft(null);
        setSelectedRight(null);
        setMatchedPairs([]);
        setGameResult(null);
        setIsModalOpen(false);
    }, [gameOptions]);

    useEffect(() => {
        initGame();
    }, [initGame]);

    useEffect(() => {
        if (selectedLeft && selectedRight) {
            const isMatch = selectedLeft.match === selectedRight.value;

            if (isMatch) {
                // speakSpanish(selectedLeft.value); // Если есть функция озвучивания
                setMatchedPairs(prev => [...prev, selectedLeft.value, selectedRight.value]);
                setSelectedLeft(null);
                setSelectedRight(null);
            } else {
                // playSound('/sounds/error.wav'); // Если есть функция звука ошибки
                setTimeout(() => {
                    setSelectedLeft(null);
                    setSelectedRight(null);
                }, 500);
            }
        }
    }, [selectedLeft, selectedRight]);
    
    useEffect(() => {
        if (pairs.length > 0 && matchedPairs.length === pairs.length * 2 && !gameResult) {
            const xpEarned = gameOptions.count * 1; 
            if (addXP) {
                addXP(xpEarned);
            }
            setGameResult({ xp: xpEarned }); 
            setTimeout(() => {
                setIsModalOpen(true);
            }, 300);
        }
    }, [matchedPairs, pairs, gameOptions.count, addXP, gameResult]);

    const handleCloseModalAndRestart = () => {
        setIsModalOpen(false);
        initGame();
    };

    const handleWordClick = (word, column) => {
        if (matchedPairs.includes(word.value) || matchedPairs.includes(word.match)) {
            return;
        }

        if (column === 'left') {
            if (selectedLeft?.value === word.value) {
                setSelectedLeft(null);
            } else {
                setSelectedLeft(word);
            }
        } else {
            if (selectedRight?.value === word.value) {
                setSelectedRight(null);
            } else {
                setSelectedRight(word);
            }
        }
    };
    
    return (
        <Card className="w-full max-w-4xl mx-auto my-8 p-6">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Найди пару (Vanilla)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <Button onClick={onBack} variant="outline">← К списку уроков</Button>
                    <div className="flex space-x-4">
                        <div>
                            <label htmlFor="category-select" className="block text-sm font-medium text-gray-700">Категория:</label>
                            <Select value={gameOptions.category} onValueChange={(value) => setGameOptions(prev => ({ ...prev, category: value }))}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="verbs">Глаголы</SelectItem>
                                    <SelectItem value="nouns">Существительные</SelectItem>
                                    <SelectItem value="adjectives">Прилагательные</SelectItem>
                                    <SelectItem value="adverbs">Наречия</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="pair-count" className="block text-sm font-medium text-gray-700">Количество пар:</label>
                            <Select value={gameOptions.count.toString()} onValueChange={(value) => setGameOptions(prev => ({ ...prev, count: parseInt(value, 10) }))}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Количество" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between space-x-4 mt-6">
                    <div className="flex-1 border border-gray-300 rounded-lg p-4 bg-blue-50">
                        <h4 className="text-lg font-semibold mb-3">Русский</h4>
                        <div className="space-y-2">
                            {leftWords.map(word => (
                                <div 
                                    key={word.value}
                                    className={`p-2 rounded-md cursor-pointer text-center font-medium
                                        ${selectedLeft?.value === word.value ? 'bg-yellow-300' : 'bg-gray-100'}
                                        ${matchedPairs.includes(word.value) ? 'bg-green-400 text-white' : ''}
                                        ${matchedPairs.includes(word.value) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}
                                    `}
                                    onClick={() => handleWordClick(word, 'left')}
                                >
                                    {word.value}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 border border-gray-300 rounded-lg p-4 bg-red-50">
                        <h4 className="text-lg font-semibold mb-3">Испанский</h4>
                        <div className="space-y-2">
                            {rightWords.map(word => (
                                <div 
                                    key={word.value}
                                    className={`p-2 rounded-md cursor-pointer text-center font-medium
                                        ${selectedRight?.value === word.value ? 'bg-yellow-300' : 'bg-gray-100'}
                                        ${matchedPairs.includes(word.value) ? 'bg-green-400 text-white' : ''}
                                        ${matchedPairs.includes(word.value) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}
                                    `}
                                    onClick={() => handleWordClick(word, 'right')}
                                >
                                    {word.value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Button onClick={initGame} variant="secondary">Начать заново</Button>
                </div>
            </CardContent>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">Поздравляем!</DialogTitle>
                </DialogHeader>
                <div className="text-center">
                  <p>Вы нашли все пары!</p>
                  {gameResult && (
                      <p className="text-lg font-semibold mt-2">Заработано очков: {gameResult.xp} XP</p>
                  )}
                  <Button onClick={handleCloseModalAndRestart} className="mt-4">Отлично!</Button>
                </div>
              </DialogContent>
            </Dialog>
        </Card>
    );
};

export default FindPairGameVanilla;
