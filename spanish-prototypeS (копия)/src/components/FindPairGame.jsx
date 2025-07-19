// src/components/FindPairGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import gameData from '../data/findPairData.json';

const PAIRS_COUNT = 8;
const XP_AWARD = 10;

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const FindPairGame = ({ onBack, addXP }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const xpAwarded = useRef(false);

  useEffect(() => {
    const allWords = [...gameData.verbs, ...gameData.nouns, ...gameData.adjectives, ...gameData.adverbs];
    const shuffledWords = shuffleArray(allWords).slice(0, PAIRS_COUNT);
    
    const gameCards = shuffledWords.flatMap((word, index) => [
      { id: `${index}-ru`, pairId: index, content: word.ru, type: 'ru', isFlipped: false, isMatched: false },
      { id: `${index}-es`, pairId: index, content: word.es, type: 'es', isFlipped: false, isMatched: false },
    ]);

    setCards(shuffleArray(gameCards));
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      
      if (firstCard.pairId === secondCard.pairId) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              (card.id === firstCard.id || card.id === secondCard.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedPairs === PAIRS_COUNT && !xpAwarded.current) {
      setIsGameWon(true);
      if (addXP) addXP(XP_AWARD);
      xpAwarded.current = true;
    }
  }, [matchedPairs, addXP]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, newCards[index]]);

    // Воспроизведение звука для испанской карточки
    if (newCards[index].type === 'es') {
      const utterance = new SpeechSynthesisUtterance(newCards[index].content);
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang === 'es-ES') || voices.find(v => v.lang.startsWith('es-'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
        utterance.lang = 'es-ES';
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-secondary p-4 md:p-8 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Найди пару</h1>
        <Button variant="outline" onClick={onBack}>Назад в меню</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{perspective: '1000px'}}>
        {cards.map((card, index) => (
          <div key={card.id} className="h-16 md:h-32 rounded-lg cursor-pointer" style={{transformStyle: 'preserve-3d'}} onClick={() => handleCardClick(index)}>
            <div className={`relative w-full h-full text-center transition-transform duration-500 shadow-md rounded-lg ${card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''}`} style={{transformStyle: 'preserve-3d'}}>
              <div className="absolute w-full h-full rounded-lg bg-primary" style={{backfaceVisibility: 'hidden'}}></div>
              <div className={`absolute w-full h-full rounded-lg flex items-center justify-center p-2 text-lg font-semibold ${card.isMatched ? 'bg-green-200' : 'bg-card'}`} style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                {card.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isGameWon} onOpenChange={(isOpen) => !isOpen && onBack()}>
        <DialogContent className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white">
          <DialogHeader className="text-center">
            <DialogTitle>Игра пройдена!</DialogTitle>
            <DialogDescription>Поздравляем с успешным завершением игры!</DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <div className="text-4xl mb-4">
              {'★'.repeat(3)}{'☆'.repeat(0)}
            </div>
            <div className="text-lg">
              Заработано очков: <span className="font-bold">{XP_AWARD} XP</span>
            </div>
          </div>
          <DialogFooter className="flex justify-center">
            <Button onClick={onBack}>Отлично!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FindPairGame;
