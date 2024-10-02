const express = require('express');
const path = require('path');
const { Telegraf, Markup } = require('telegraf');

const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public'))); // Убедитесь, что путь правильный

// Маршрут для игры
app.get('/game/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Путь к вашей игре
});

// Запуск сервера Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

// Обработка команды /start
bot.command('start', (ctx) => {
    console.log('Команда /start получена от пользователя:', ctx.from.id); // Лог для отладки
    ctx.reply(
        'Нажмите кнопку ниже, чтобы начать игру:',
        Markup.inlineKeyboard([
            Markup.button.callback('Начать игру', 'start_game')
        ])
    ).then(() => console.log('Кнопка отправлена пользователю'))
     .catch(err => console.error('Ошибка при отправке кнопки:', err));
});

// Обработка нажатия кнопки
bot.action('start_game', (ctx) => {
    console.log('Получен callback от кнопки start_game для пользователя:', ctx.from.id); // Лог для отладки
    const gameLink = `https://find-pair-new.vercel.app/?id=${ctx.from.id}`; // Ссылка на вашу игру с id пользователя
    
    // Попытка отправить ссылку на игру
    ctx.reply(`Перейдите по ссылке, чтобы начать игру: ${gameLink}`)
        .then(() => console.log('Ссылка отправлена успешно'))
        .catch(err => {
            console.error('Ошибка при отправке ссылки:', err);
            ctx.reply('Произошла ошибка при отправке ссылки. Попробуйте позже.');
        });

    // Уведомляем Telegram о том, что запрос обработан
    ctx.answerCbQuery()
        .then(() => console.log('CallbackQuery обработан'))
        .catch(err => console.error('Ошибка обработки CallbackQuery:', err));
});

// Обработка текстовых сообщений
bot.on('text', (ctx) => {
    console.log('Получено сообщение от пользователя:', ctx.message.text); // Лог для отладки
    ctx.reply(`Ваше сообщение: ${ctx.message.text}`);
});

// Запуск Telegram бота
bot.launch()
    .then(() => {
        console.log('Бот запущен и готов к работе!');
    })
    .catch(err => {
        console.error('Ошибка при запуске бота:', err);
    });

