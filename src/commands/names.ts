import { Telegraf } from 'telegraf';
import { waitingForResponse } from '../bot';
import { handleNames } from '../utils/handleNames';

export const namesCommand = (bot: Telegraf) => {
  bot.command('names', (ctx) => {
    const messageWithNames = ctx.message.text.split(' ').slice(1).join(' ').trim();
    const names = messageWithNames.split(/\s+[и\/]\s+/);

    if (messageWithNames) {
      if (names.length === 2) {
        return handleNames(ctx, messageWithNames);
      } else {
        return ctx.reply('Одного имени маловато! Нужно два для магии!🔮✨ Попробуй снова: Имя1 и Имя2');
      }
    } else {
      waitingForResponse.set(ctx.message.from.id, 'names');
      return ctx.reply('🤭 Напиши два имени через "и", чтобы узнать процент совместимости.');
    }
  });
};
