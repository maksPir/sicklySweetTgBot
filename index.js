const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;

const walletBreakCutArray = [["Камень"],   ["Ножницы"],   ["Бумага"]]; 

const bot = new TelegramBot(token, {polling: true});

var level = 1;
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if(msg.text === 'Hello') {
    bot.sendMessage(chatId, `Hello, ${msg.from.first_name}`, {
        "reply_markup": {
            "keyboard": [["Начать игру"],   ["Завершить игру"]]
        }
    });
  }

  if(msg.text === 'location') {
    bot.sendLocation(chatId, 53.226935,50.191408);
    bot.sendMessage(chatId, "Иди сюда");
  }

  game(msg.text, level, chatId);

  if(msg.text === '/photo') {
     bot.sendPhoto(chatId, 'https://content2.flowwow-images.com/data/blog/17/1706686016_8859517.jpg', {caption: 'Sickly Sweet Bot'})
  }
});

function game(inputValue, level, chatId) {
    if(level === 1 || true) {
        switch (inputValue) {
            case 'Начать игру':
                    bot.sendMessage(chatId, `Как меня зовут?`, {
                        "reply_markup": {
                            "keyboard": [["Максим"],   ["Пааандочка"]]
                        }
                    });
                break;
            case 'Пааандочка':
                    bot.sendMessage(chatId, `А если немного подумать?`, {
                        "reply_markup": {
                            "keyboard": [["Максим"],   ["Пааандочка"]]
                        }
                    });
                break;
            case 'Максим':
                    level++;
                    bot.sendMessage(chatId, `Все верно!`, {
                        "reply_markup": {
                            "keyboard": [["Продолжаем игру"]]
                        }
                    });
                break;
            default:
                break;
        }
    }

     if(level === 2 || true) {
        const answer = new Date().getDate()%3;
        switch (inputValue) {
            case 'Продолжаем игру':
                    bot.sendMessage(chatId, `Сыграем в мою любимую игру?`, {
                        "reply_markup": {
                            "keyboard": [["Да"],   ["Конечно да"]]
                        }
                    });
                break;
            case 'Да':
            case 'Конечно да':
                    bot.sendMessage(chatId, `Су-е-фа!!! Ваш выбор?`, {
                        "reply_markup": {
                            "keyboard": walletBreakCutArray
                        }
                    });
                break;
            case 'Камень': 
                if(walletBreakCutArray[answer][0]==='Камень') {
                    level++;
                    bot.sendMessage(chatId, `Ты выиграл!`, {
                        "reply_markup": {
                            "keyboard": [['Дальшееее']]
                        }
                    });
                } else {
                    bot.sendMessage(chatId, `Ты проиграл! \n Су-е-фа!!! Ваш выбор?`, {
                        "reply_markup": {
                            "keyboard": walletBreakCutArray
                        }
                    });
                }
               
                break;
            case 'Ножницы':
                if(walletBreakCutArray[answer][0]==='Ножницы') {
                    level++;
                    bot.sendMessage(chatId, `Ты выиграл!`, {
                        "reply_markup": {
                            "keyboard": [['Дальшееее']]
                        }
                    });
                } else {
                    bot.sendMessage(chatId, `Ты проиграл! \n Су-е-фа!!! Ваш выбор?`, {
                        "reply_markup": {
                            "keyboard": walletBreakCutArray
                        }
                    });
                }
            break;
            case 'Бумага':
                if(walletBreakCutArray[answer][0]==='Бумага') {
                    level++;
                    bot.sendMessage(chatId, `Ты выиграл!`, {
                        "reply_markup": {
                            "keyboard": [['Дальшееее']]
                        }
                    });
                } else {
                    bot.sendMessage(chatId, `Ты проиграл! \n Су-е-фа!!! Ваш выбор?`, {
                        "reply_markup": {
                            "keyboard": walletBreakCutArray
                        }
                    });
                }
            break;
            default:
                break;
        }
    }

    if(level === 3 || true) {
        switch (inputValue) {
            case 'Дальшееее':
                    bot.sendMessage(chatId, `Вы добрались до уровня 3. \nКакой вы молодец!`, {
                        "reply_markup": {
                            "keyboard": [["Я знаю"],   ["Я гений"]]
                        }
                    });
                break;
            default:
                break;
        }
    }

    if(level === 3 || true) {
        switch (inputValue) {
            case 'Я знаю':
            case 'Я гений':
                    bot.sendMessage(chatId, `Какой мой любимый напиток`, {
                        "reply_markup": {
                            "keyboard": [["Сок"],   ["Вода"], ["Пиво"]]
                        }
                    });
                break;
            case 'Пиво':
                bot.sendMessage(chatId, `Осуждаю его! \nПовторю вопрос: Какой мой любимый напиток`, {
                    "reply_markup": {
                        "keyboard": [["Сок"],   ["Вода"], ["Пиво"]]
                    }
                });
            break;
            case 'Вода':
                bot.sendMessage(chatId, `Это твой любимый напиток. И все же какой мой любимый напиток`, {
                    "reply_markup": {
                        "keyboard": [["Сок"],   ["Вода"], ["Пиво"]]
                    }
                });
            break;
            case 'Сок':
                bot.sendMessage(chatId, `Ееее ты молодец!!!`, {
                    "reply_markup": {
                        "keyboard": [["Перейти к крайнему заданию"]]
                    }
                });
            break;
            default:
                break;
        }
    }

    if(level === 4 || inputValue === 'Перейти к крайнему заданию') { 
        bot.sendLocation(chatId, 53.226935,50.191408);
        bot.sendMessage(chatId, "Иди сюда. Там сюрприз");
    }
    
}

