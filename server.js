const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание статических файлов из текущей директории
app.use(express.static(path.join(__dirname)));

// Маршрут для игры
app.get('/game/:id', (req, res) => {
    res.redirect('https://find-pair-olive.vercel.app');  // Перенаправляем пользователя на развернутую игру на Vercel
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

// Команда start для Telegram бота
bot.command('start', (ctx) => {
    const gameLink = `https://find-pair-olive.vercel.app/?id=${ctx.from.id}`;
    ctx.reply(`Добро пожаловать в игру! Перейдите по ссылке для игры: ${gameLink}`);
});

// Обработка текстовых сообщений
bot.on('text', (ctx) => {
    ctx.reply(`Ваше сообщение: ${ctx.message.text}`);
});

// Запуск Telegram бота
bot.launch();

