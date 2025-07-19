// src/components/Leaderboard.jsx
import React from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const Leaderboard = ({ onBack, userId, onLoginClick, onRegisterClick }) => {
  const { leaderboard, loading } = useLeaderboard(userId);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-muted-foreground">Загрузка таблицы лидеров...</p>;
    }

    if (!userId || userId === 'guest') {
      return (
        <div className="text-center space-y-4">
          <p>Таблица лидеров доступна только для зарегистрированных пользователей.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={onLoginClick}>Войти</Button>
            <Button variant="outline" onClick={onRegisterClick}>Создать аккаунт</Button>
          </div>
        </div>
      );
    }

    if (leaderboard.length === 0) {
      return <p className="text-center text-muted-foreground">Пока нет данных для отображения.</p>;
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Место</TableHead>
            <TableHead>Игрок</TableHead>
            <TableHead className="text-right">Очки (XP)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((player, index) => (
            <TableRow key={player.id} className={player.id === userId ? 'bg-secondary' : ''}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                {player.photoURL ? (
                  <img src={player.photoURL} alt={player.displayName} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                    {player.displayName?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
                {player.displayName}
              </TableCell>
              <TableCell className="text-right font-bold">{player.totalXP}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl">Таблица лидеров</CardTitle>
            <CardDescription>Топ-10 лучших учеников</CardDescription>
        </CardHeader>
        <CardContent>
            {renderContent()}
        </CardContent>
        <div className="p-6 border-t mt-4">
            <Button variant="outline" onClick={onBack} className="w-full">Назад в меню</Button>
        </div>
    </Card>
  );
};

export default Leaderboard;
