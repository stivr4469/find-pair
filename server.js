const express = require('express');
const path = require('path');
const app = express();
const { Telegraf } = require('telegraf');

const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание статических файлов из корневой папки
app.use(express.static(__dirname)); // Обслуживаем файлы из корневой папки

// Маршрут для игры
app.get('/game/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Убедитесь, что путь правильный
});

// Запуск сервера
app.listen(3000, '0.0.0.0', () => {
    console.log('Сервер запущен на порту 3000');
});

// Телеграм-бот: стартовая команда
bot.command('start', (ctx) => {
    const gameLink = `http://localhost:3000/game/${ctx.from.id}`;
    ctx.reply(`Добро пожаловать в игру! Вы можете играть, перейдя по ссылке: ${gameLink}`);
});

// Обработка сообщений от пользователя
bot.on('text', (ctx) => {
    ctx.reply(`Ваш результат: ${ctx.message.text}`);
});

// Запуск бота
bot.launch();

