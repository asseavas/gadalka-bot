import { Telegraf } from 'telegraf';

export const startCommand = (bot: Telegraf) => {
  bot.start((ctx) => {
    ctx.reply('Привет! Я бот-гадалка. Напиши */help*, чтобы узнать, что я умею ✨', { parse_mode: 'Markdown' });
  });
};
