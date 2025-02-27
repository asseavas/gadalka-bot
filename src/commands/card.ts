import { Telegraf } from 'telegraf';
import { waitingForResponse } from '../bot';
import { handleCard } from '../utils/handleCard';

export const cardCommand = (bot: Telegraf) => {
  bot.command('card', (ctx) => {
    const cardName = ctx.message.text.split(' ').slice(1).join(' ').trim();

    if (cardName) {
      return handleCard(ctx, cardName);
    } else {
      waitingForResponse.set(ctx.message.from.id, 'card');
      return ctx.reply('🎴 Напиши название карты таро, и я расскажу тебе о ней.');
    }
  });
};
