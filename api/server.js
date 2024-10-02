const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
const favicon = require('serve-favicon'); // Импортируем пакет serve-favicon

const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Убедитесь, что файл favicon.ico находится в папке public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // Обслуживание favicon

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname))); // Убедитесь, что путь правильный

// Обработка маршрута для главной страницы
app.get('/', (req, res) => {
  res.send('Welcome to Find Pair Game');
});

// Маршрут для игры
app.get('/game/:id', (req, res) => {
  res.redirect('https://find-pair-m60g5gawr-stivr4469gmailcoms-projects.vercel.app/');  // Перенаправляем пользователя на развернутую игру на Vercel
});

// Команда /start для запуска игры через диалог
bot.command('start', (ctx) => {
  const gameLink = `https://find-pair-m60g5gawr-stivr4469gmailcoms-projects.vercel.app/?id=${ctx.from.id}`;
  ctx.reply(`Добро пожаловать в игру! Перейдите по ссылке для игры: ${gameLink}`);
});

// Обработка текстовых сообщений
bot.on('text', (ctx) => {
  ctx.reply(`Ваше сообщение: ${ctx.message.text}`);
});

// Команда /start для запуска игры через диалог
bot.command('start', (ctx) => {
  const gameLink = `https://find-pair-m60g5gawr-stivr4469gmailcoms-projects.vercel.app/?id=${ctx.from.id}`;
  ctx.reply(`Добро пожаловать в игру! Перейдите по ссылке для игры: ${gameLink}`);
});

// Запуск Telegram бота
bot.launch().catch(err => console.error('Ошибка при запуске бота:', err));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

