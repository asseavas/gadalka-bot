import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN || '');

bot.start((ctx) => {
  ctx.reply('Привет! Я бот-гадалка. Напиши /help, чтобы узнать, что я умею.');
});

bot.help((ctx) => {
  ctx.reply(
    'Вот что я умею:\n/card_of_the_day - Карта дня\n/yesno - Гадание на "Да/Нет"\n/future - Расклад на будущее'
  );
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
