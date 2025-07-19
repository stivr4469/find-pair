import React from 'react';
import { Button } from './ui/button';

const WelcomeScreen = ({ onLoginClick, onRegisterClick, onStartAsGuest }) => {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/cover.png')" }}
      ></div>
      <div className="fixed inset-0 bg-black opacity-25"></div>
      <div className="fixed inset-0 flex flex-col items-center text-white z-10">
        <div className="mt-4 text-center">
          <h1 className="text-6xl font-bold mb-4 drop-shadow-md">¡Hola!</h1>
          <p className="text-2xl drop-shadow">Готовы улучшить свой испанский?</p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs px-4 mt-auto mb-4 relative z-20">
          <Button className="bg-emerald-600 bg-opacity-60 text-white hover:bg-emerald-700 hover:bg-opacity-70" onClick={() => { console.log('Login button clicked'); onLoginClick(); }}>
            Войти
          </Button>
          <Button className="bg-green-600 bg-opacity-60 text-white hover:bg-green-700 hover:bg-opacity-70" onClick={() => { console.log('Register button clicked'); onRegisterClick(); }}>
            Зарегистрироваться
          </Button>
          <Button className="bg-gray-700 bg-opacity-60 text-white hover:bg-gray-800 hover:bg-opacity-70" onClick={onStartAsGuest}>
            Продолжить как гость
          </Button>
        </div>

        <p className="text-xl font-light drop-shadow mb-4">Valencia 2025</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;