const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');

const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname)));

// Команда /start для запуска игры через диалог
bot.command('start', (ctx) => {
    ctx.replyWithGame('findpair')  // Используем зарегистрированное короткое имя игры
    .catch(err => {
        console.error('Ошибка отправки игры:', err);
        ctx.reply('Произошла ошибка при отправке игры. Попробуйте позже.');
    });
});

// Обработка инлайн-запросов для отправки игры через инлайн-режим
bot.on('inline_query', (ctx) => {
    const results = [
        {
            type: 'game',
            id: '1',
            game_short_name: 'findpair' // Используем короткое имя игры
        }
    ];
    ctx.answerInlineQuery(results);
});

// Запуск бота
bot.launch();

// Запуск Express сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

