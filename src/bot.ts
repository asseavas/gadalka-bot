import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { message } from 'telegraf/filters';
import { helpCommand } from './commands/help';
import { startCommand } from './commands/start';
import { cardOfTheDayCommand } from './commands/card_of_the_day';
import { yesnoCommand } from './commands/yesno';
import { futureCommand } from './commands/future';
import { cardCommand } from './commands/card';
import { wakeUpBot } from './commands/wakeUp';
import { namesCommand } from './commands/names';
import { handleYesno } from './utils/handleYesno';
import { handleCard } from './utils/handleCard';
import { handleNames } from './utils/handleNames';
import { handleDates } from './utils/handleDates';
import { datesCommand } from './commands/dates';

dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error('❌ BOT_TOKEN is missing in .env file');
}

export const bot = new Telegraf(process.env.BOT_TOKEN as string);
export const waitingForResponse = new Map<number, string>();

wakeUpBot(bot);
startCommand(bot);
helpCommand(bot);
cardOfTheDayCommand(bot);
futureCommand(bot);
yesnoCommand(bot);
cardCommand(bot);
namesCommand(bot);
datesCommand(bot);

bot.on(message('text'), async (ctx) => {
  const userId = ctx.message.from.id;
  const command = waitingForResponse.get(userId);
  const userMessage = ctx.message.text.trim();

  if (!command) return;

  switch (command) {
    case 'yesno':
      await handleYesno(ctx, userMessage);
      break;
    case 'card':
      await handleCard(ctx, userMessage);
      break;
    case 'names':
      await handleNames(ctx, userMessage);
      break;
    case 'dates':
      await handleDates(ctx, userMessage);
      break;
    default:
      await ctx.reply('Что-то пошло не так, попробуй снова.');
  }

  waitingForResponse.delete(userId);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
