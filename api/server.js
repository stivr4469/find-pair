const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');

const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Используем правильный путь к favicon
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // Убедитесь, что путь правильный

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public'))); // Убедитесь, что путь правильный

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
    ctx.answerInlineQuery(results).catch(err => {
        console.error('Ошибка отправки инлайн-игры:', err);
    });
});

// Обработка нажатия кнопки при callback_query (если нужно перенаправить пользователя на игру)
bot.on('callback_query', async (ctx) => {
    const gameLink = `https://find-pair-new.vercel.app/?id=${ctx.from.id}`; // Ссылка на вашу игру с id пользователя

    // Уведомляем пользователя о начале игры
    await ctx.reply(`Перейдите по ссылке, чтобы начать игру: ${gameLink}`);
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что запрос обработан
});

// Запуск Telegram бота
bot.launch()
    .then(() => {
        console.log('Бот запущен и готов к работе!');
    })
    .catch(err => {
        console.error('Ошибка при запуске бота:', err);
    });

// Запуск сервера Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

