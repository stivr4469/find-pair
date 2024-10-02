const express = require('express');
const path = require('path');
const { Telegraf, Markup } = require('telegraf'); // Добавили Markup для кнопок

const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public'))); // Убедитесь, что путь правильный

// Команда /start для запуска игры через диалог с кнопкой
bot.command('start', (ctx) => {
    console.log('Команда /start была вызвана'); // Лог для отладки
    // Создаем инлайн-кнопку для начала игры
    ctx.reply('Нажмите на кнопку ниже, чтобы начать игру:', 
        Markup.inlineKeyboard([
            Markup.button.callback('Начать игру', 'start_game') // Кнопка, которая отправит callback с 'start_game'
        ])
    );
});

// Обработка callback_query при нажатии на кнопку
bot.action('start_game', (ctx) => {
    console.log('Получен callback с start_game'); // Лог для отладки
    const gameLink = `https://find-pair-new.vercel.app/?id=${ctx.from.id}`; // Ссылка на вашу игру с id пользователя

    // Уведомляем пользователя о начале игры
    ctx.reply(`Перейдите по ссылке, чтобы начать игру: ${gameLink}`)
        .then(() => console.log('Ссылка отправлена пользователю')) // Лог отправки
        .catch(err => console.error('Ошибка при отправке ссылки:', err)); // Лог ошибки, если она возникнет

    ctx.answerCbQuery(); // Уведомляем Telegram, что запрос обработан
});

// Обработка инлайн-запросов для отправки игры через инлайн-режим
bot.on('inline_query', (ctx) => {
    console.log('Получен inline_query'); // Лог для отладки
    const results = [
        {
            type: 'game',
            id: '1',
            game_short_name: 'findpair' // Используем короткое имя игры
        }
    ];
    ctx.answerInlineQuery(results)
        .then(() => console.log('Инлайн-игра успешно отправлена')) // Лог успеха
        .catch(err => console.error('Ошибка отправки инлайн-игры:', err)); // Лог ошибки
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

