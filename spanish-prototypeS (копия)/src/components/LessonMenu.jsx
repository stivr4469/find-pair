import React, { useState } from 'react';
import { moduleStructure } from '../data/moduleData';
import { Button } from './ui/button'; // Импортируем нашу новую кнопку

const UserStats = ({ progress }) => {
  if (!progress) return <div className="text-sm text-muted-foreground">Загрузка статистики...</div>;
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">{progress.totalXP || 0}</span>
        <span className="text-sm text-muted-foreground">XP</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">{progress.streak?.count || 0}</span>
        <span className="text-2xl">🔥</span>
      </div>
    </div>
  );
};

const LessonCard = ({ lessonId, onSelectLesson, score }) => {
  const stars = score || 0;
  const lessonNumber = lessonId.replace('U', '');

  return (
    <div 
      className="p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 bg-indigo-500"
      onClick={() => onSelectLesson(lessonId)}
    >
      <div className="font-semibold mb-2">Урок {lessonNumber}</div>
      <div className="text-xl text-center">
        {[1, 2, 3].map((star) => (
          <span key={star} className={star <= stars ? 'text-yellow-500' : 'text-gray-300'}>★</span>
        ))}
      </div>
    </div>
  );
};

const LessonMenu = ({ 
  user, 
  onSignOut, 
  onSelectLesson, 
  progress, 
  onShowLeaderboard, 
  onShowHandbook,
  onShowDictionary, 
  onStartExam,
  onStartFindPairGame,
  onNavigateToFormulas
}) => {
  const [examLevel, setExamLevel] = useState('A1');

  return (
    <div className="p-4 md:p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-primary mb-2">¡Aprender Español!</h1>
          <div className="text-muted-foreground mb-4">
            {user ? `Здравствуйте, ${user.displayName || 'Ученик'}!` : 'Вы вошли как гость.'}
          </div>
          <UserStats progress={progress} />
        </div>
        <div className="w-full md:w-auto flex flex-col gap-2">
          <Button onClick={onSignOut} className="bg-blue-500 hover:bg-blue-600 text-white">
            {user ? 'Выйти' : 'Выйти из гостевого режима'}
          </Button>
          <Button onClick={onShowLeaderboard} className="bg-purple-500 hover:bg-purple-600 text-white">Таблица лидеров</Button>
          <Button onClick={onShowHandbook} className="bg-blue-500 hover:bg-blue-600 text-white">Справочник</Button>
          <Button onClick={onNavigateToFormulas} className="bg-green-500 hover:bg-green-600 text-white">20 формул</Button>
          <Button onClick={onShowDictionary} className="bg-purple-400 hover:bg-purple-500 text-white">Словарь</Button>
          <Button onClick={onStartFindPairGame}>Игра "Найди пару"</Button>
          <div className="flex items-center gap-2 mt-2">
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={examLevel}
              onChange={(e) => setExamLevel(e.target.value)}
            >
              <option value="A1">Экзамен A1</option>
              <option value="A2">Экзамен A2</option>
              <option value="B1">Экзамен B1</option>
            </select>
            <Button onClick={() => onStartExam(examLevel)} className="bg-indigo-500 hover:bg-indigo-600 text-white">Начать</Button>
          </div>
        </div>
      </header>
      
      {moduleStructure.map((module, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-blue-700 text-center">{module.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {module.lessons.map(lessonId => (
              <LessonCard
                key={lessonId}
                lessonId={lessonId}
                onSelectLesson={onSelectLesson}
                score={progress?.lessonScores?.[lessonId] || 0}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonMenu;
