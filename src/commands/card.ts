import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { findCardResponse } from '../utils/findCardResponse';

const waitingForQuestion = new Map<number, boolean>();

export const cardCommand = (bot: Telegraf) => {
  bot.command('card', (ctx) => {
    const cardName = ctx.message.text.split(' ').slice(1).join(' ').trim();

    if (cardName) {
      return ctx.reply(findCardResponse(cardName), { parse_mode: 'Markdown' });
    } else {
      waitingForQuestion.set(ctx.message.from.id, true);
      return ctx.reply('🃏 Напиши название карты, и я расскажу тебе о ней.');
    }
  });

  bot.on(message('text'), (ctx) => {
    const userId = ctx.message.from.id;

    if (waitingForQuestion.has(userId)) {
      const cardName = ctx.message.text;
      ctx.reply(findCardResponse(cardName), { parse_mode: 'Markdown' });

      waitingForQuestion.delete(userId);
    }
  });
};
