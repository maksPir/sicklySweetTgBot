import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

const token = process.env.TELEGRAM_TOKEN; // Укажите ваш токен в переменных окружения
const TELEGRAM_API_URL = `https://api.telegram.org/bot${token}`;

// Используем body-parser для парсинга JSON
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

// Обработка входящих обновлений от Telegram
app.post('/webhook', async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const messageText = update.message.text;

    // Отправляем ответное сообщение
    await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Вы сказали: ${messageText}`,
      }),
    });
  }

  res.sendStatus(200);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});