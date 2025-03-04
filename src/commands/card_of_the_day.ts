import { getRandomCard } from '../utils/getRandomCards';
import { Telegraf } from 'telegraf';

export const cardOfTheDayCommand = (bot: Telegraf) => {
  bot.command('card_of_the_day', (ctx) => {
    const { card, isUpright } = getRandomCard();
    const position = isUpright ? 'прямое положение' : 'перевёрнутое положение';
    const meaning = isUpright ? card.meaning_upright : card.meaning_reversed;

    ctx.reply(
      `🎴 Карта дня: *${card.name}* (${position})\n\n` +
        `📜 *Описание:* ${card.description}\n\n` +
        `🔮 *Значение:* ${meaning}\n\n` +
        `✨ *Совет:* ${card.advice}\n\n` +
        `⚠️ *Предупреждение:* ${card.warning}`,
      { parse_mode: 'Markdown' }
    );
  });
};
