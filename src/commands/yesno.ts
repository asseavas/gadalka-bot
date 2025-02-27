import { Telegraf } from 'telegraf';
import { waitingForResponse } from '../bot';
import { handleYesno } from '../utils/handleYesno';

export const yesnoCommand = (bot: Telegraf) => {
  bot.command('yesno', (ctx) => {
    const question = ctx.message.text.split(' ').slice(1).join(' ').trim();

    if (question) {
      return handleYesno(ctx, question);
    } else {
      waitingForResponse.set(ctx.message.from.id, 'yesno');
      return ctx.reply('🔮 Задай мне вопрос, и я дам ответ "да" или "нет".');
    }
  });
};
