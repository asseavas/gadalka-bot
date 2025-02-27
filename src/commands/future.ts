import { Telegraf } from 'telegraf';
import { Card } from '../types';
import { getRandomCard } from '../utils/getRandomCards';

export const futureCommand = (bot: Telegraf) => {
  bot.command('future', (ctx) => {
    const selectedCards = new Set<Card>();

    while (selectedCards.size < 3) {
      selectedCards.add(getRandomCard().card);
    }

    const message = Array.from(selectedCards)
      .map((card, index) => {
        const { isUpright } = getRandomCard();
        const position = isUpright ? 'прямое положение' : 'перевёрнутое положение';
        const meaning = isUpright ? card.meaning_upright : card.meaning_reversed;

        return (
          `🎴 *Карта ${index + 1}:* ${card.name} (${position})\n` +
          `📜 *Значение:* ${meaning}\n` +
          `💡 *Совет:* ${card.advice}\n` +
          `⚠️ *Предупреждение:* ${card.warning}\n\n`
        );
      })
      .join('');

    ctx.reply(`🔮 *Расклад на будущее:*\n\n${message}`, { parse_mode: 'Markdown' });
  });
};
