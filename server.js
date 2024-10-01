const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname)));

// Команда /start для Telegram бота с кнопкой запуска игры
bot.command('start', (ctx) => {
    // Отправляем кнопку для запуска игры с зарегистрированным коротким именем "findpair"
    ctx.replyWithGame({
        game_short_name: 'findpair'  // Используем зарегистрированное короткое имя игры
    });
});

// Обрабатываем нажатие кнопки и переход на игру
bot.on('callback_query', (ctx) => {
    const gameLink = `https://find-pair-olive.vercel.app/?id=${ctx.from.id}`;  // Ссылка на вашу игру с id пользователя
    ctx.answerGameQuery(gameLink);
});

// Запуск Telegram бота
bot.launch();

