import { Telegraf } from 'telegraf';
import { waitingForResponse } from '../bot';
import { handleDates } from '../utils/handleDates';

export const datesCommand = (bot: Telegraf) => {
  bot.command('dates', (ctx) => {
    const messageWithDates = ctx.message.text.split(' ').slice(1).join(' ').trim();
    const dates = messageWithDates.split(/\s+[и\/]\s+/);

    if (messageWithDates) {
      if (dates.length === 2) {
        return handleDates(ctx, messageWithDates);
      } else {
        return ctx.reply('Нужно две даты для магии! 🔮✨ Попробуй снова: 01.12.2004 и 20.06.2003');
      }
    } else {
      waitingForResponse.set(ctx.message.from.id, 'dates');
      return ctx.reply('❤️‍🔥 Напиши две даты через "и", чтобы узнать подробнее совместимости.');
    }
  });
};
