import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { getYesNoResponse } from '../utils/getYesNoResponse';

const waitingForQuestion = new Map<number, boolean>();

export const yesnoCommand = (bot: Telegraf) => {
  bot.command('yesno', (ctx) => {
    const question = ctx.message.text.split(' ').slice(1).join(' ');

    if (question) {
      return ctx.reply(getYesNoResponse(question), { parse_mode: 'Markdown' });
    } else {
      waitingForQuestion.set(ctx.message.from.id, true);
      return ctx.reply('🔮 Задай мне вопрос, и я дам ответ "да" или "нет".', { parse_mode: 'Markdown' });
    }
  });

  bot.on(message('text'), (ctx) => {
    const userId = ctx.message.from.id;

    if (waitingForQuestion.has(userId)) {
      const question = ctx.message.text;
      ctx.reply(getYesNoResponse(question), { parse_mode: 'Markdown' });

      waitingForQuestion.delete(userId);
    }
  });
};
