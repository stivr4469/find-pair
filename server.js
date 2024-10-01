const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание статических файлов (если потребуется)
app.use(express.static(path.join(__dirname)));

// Маршрут для игры
app.get('/game/:id', (req, res) => {
    res.redirect('https://find-pair-olive.vercel.app');  // Перенаправляем на развернутую игру на Vercel
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

// Команда /start для Telegram бота с кнопкой запуска игры
bot.command('start', (ctx) => {
    const gameLink = `https://find-pair-olive.vercel.app/?id=${ctx.from.id}`;  // Ссылка на игру с id пользователя
    ctx.reply(`Добро пожаловать в игру! Вы можете играть, перейдя по ссылке: ${gameLink}`);
});

// Обрабатываем нажатие кнопки и переход на игру
bot.on('callback_query', (ctx) => {
    const gameLink = `https://find-pair-olive.vercel.app/?id=${ctx.from.id}`;  // Ссылка на игру с id пользователя
    ctx.answerGameQuery(gameLink);
});

// Запуск Telegram бота
bot.launch();

