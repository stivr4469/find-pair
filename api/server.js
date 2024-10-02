const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
const favicon = require('serve-favicon'); // Импортируем пакет serve-favicon

const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Убедитесь, что файл favicon.ico находится в папке public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // Обслуживание favicon
app.use(express.static(path.join(__dirname, 'public'))); // Обслуживание статических файлов

// Обработка маршрута для главной страницы
app.get('/', (req, res) => {
  res.send('Welcome to Find Pair Game');
});

// Команда /start для запуска игры через диалог
bot.command('start', (ctx) => {
  ctx.replyWithGame('findpair')
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
      game_short_name: 'findpair'
    }
  ];
  ctx.answerInlineQuery(results);
});

// Запуск Telegram бота
bot.launch();

// Запуск Express сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

