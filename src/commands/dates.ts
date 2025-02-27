import { Telegraf } from 'telegraf';

export const datesCommand = (bot: Telegraf) => {
  bot.command('dates', (ctx) => {
    ctx.reply('Эта команда находится в режиме разработки! Потерпите, мои хорошие 💋');
  });
};
