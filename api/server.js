const express = require('express');
const path = require('path');
const { Telegraf, Markup } = require('telegraf');

const app = express();

// Ваш Telegram бот токен
const bot = new Telegraf('8055073515:AAHHT_ZMZYqwks_s3EawcIxK6cf9YjEpAA8');

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для игры
app.get('/game/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

// Обработка команды /start
bot.command('start', (ctx) => {
    console.log('Команда /start получена от пользователя:', ctx.from.id);
    ctx.reply(
        'Нажмите кнопку ниже, чтобы начать игру:',
        Markup.inlineKeyboard([
            Markup.button.callback('Начать игру', 'start_game')
        ])
    ).then(() => console.log('Кнопка отправлена пользователю:', ctx.from.id))
     .catch(err => console.error('Ошибка при отправке кнопки:', err));
});

// Обработка нажатия кнопки
bot.action('start_game', async (ctx) => {
    try {
        console.log('Получен callback от кнопки start_game для пользователя:', ctx.from.id);
        const gameLink = `https://find-pair-new.vercel.app/?id=${ctx.from.id}`;

        // Уведомляем Telegram, что запрос нажатия кнопки обработан
        await ctx.answerCbQuery()
            .then(() => console.log('CallbackQuery обработан успешно для пользователя:', ctx.from.id))
            .catch(err => console.error('Ошибка при обработке CallbackQuery:', err));

        // Отправляем ссылку на игру
        await ctx.reply(`Перейдите по ссылке, чтобы начать игру: ${gameLink}`)
            .then(() => console.log('Ссылка на игру отправлена успешно пользователю:', ctx.from.id))
            .catch(err => console.error('Ошибка при отправке ссылки:', err));
    } catch (err) {
        console.error('Ошибка обработки кнопки start_game:', err);
        await ctx.reply('Произошла ошибка при обработке запроса. Попробуйте позже.');
    }
});

// Обработка текстовых сообщений
bot.on('text', (ctx) => {
    console.log('Получено сообщение от пользователя:', ctx.message.text);
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

