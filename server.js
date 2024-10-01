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
    ctx.replyWithGame({
        game_short_name: 'findpair'  // Используем зарегистрированное короткое имя игры
    }).catch(err => {
        console.error('Ошибка отправки игры:', err);
        ctx.reply('Произошла ошибка при отправке игры. Попробуйте позже.');
    });
});

// Обрабатываем нажатие кнопки и переход на игру
bot.on('callback_query', async (ctx) => {
    const gameLink = `https://find-pair-olive.vercel.app/?id=${ctx.from.id}`;  // Ссылка на вашу игру с id пользователя

    // Уведомляем пользователя о начале игры
    await ctx.reply(`Перейдите по ссылке, чтобы начать игру: ${gameLink}`);
    ctx.answerCallbackQuery(); // Уведомляем Telegram, что запрос обработан
});

// Запуск Telegram бота
bot.launch().then(() => {
    console.log('Бот запущен и готов к работе!');
}).catch(err => {
    console.error('Ошибка при запуске бота:', err);
});

// Запуск сервера Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

