import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { helpCommand } from './commands/help';
import { startCommand } from './commands/start';
import { cardOfTheDayCommand } from './commands/card_of_the_day';
import { yesnoCommand } from './commands/yesno';
import { futureCommand } from './commands/future';
import { cardCommand } from './commands/card';

dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error('❌ BOT_TOKEN is missing in .env file');
}

export const bot = new Telegraf(process.env.BOT_TOKEN as string);

startCommand(bot);
helpCommand(bot);
cardOfTheDayCommand(bot);
yesnoCommand(bot);
futureCommand(bot);
cardCommand(bot);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
