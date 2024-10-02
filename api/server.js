const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
const favicon = require('serve-favicon');

const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обработка маршрута для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Команда /start для запуска игры через диалог
bot.command('start', (ctx) => {
  ctx.replyWithGame('findpair')
    .catch(err => {
      console.error('Ошибка отправки игры:', err);
      ctx.reply('Произошла ошибка при отправке игры. Попробуйте позже.');
    });
});

// Запуск Telegram бота
bot.launch()
  .catch(err => console.error('Ошибка при запуске бота:', err));

// Запуск Express сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

