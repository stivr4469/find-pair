import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const AuthScreen = ({ mode, onLogin, onRegister, onGoogleSignIn, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onRegister(email, password, displayName);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle>{isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Введите ваши данные для входа.' : 'Заполните форму для регистрации.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="displayName">Ваше имя</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Имя"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Или продолжить с
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={onGoogleSignIn}>
              Google
            </Button>
          </div>
        </CardContent>
        <div className="p-6 pt-0 text-center">
          <Button variant="link" onClick={onBack}>Назад к главному экрану</Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthScreen;
