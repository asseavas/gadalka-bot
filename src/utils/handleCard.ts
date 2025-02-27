import { Context } from 'telegraf';
import { tarotCards } from '../data/tarot';
import stringSimilarity from 'string-similarity';

export const handleCard = (ctx: Context, cardName: string) => {
  const foundCard = tarotCards.find((c) => c.name.toLowerCase() === cardName.toLowerCase());

  if (foundCard) {
    return ctx.reply(
      `🎴 *Карта:* ${foundCard.name}\n\n📜 *Описание:* ${foundCard.description}\n\n💫 *Аффирмация:* ${foundCard.affirmation}`,
      { parse_mode: 'Markdown' }
    );
  }

  const bestMatch = stringSimilarity.findBestMatch(
    cardName,
    tarotCards.map((c) => c.name)
  ).bestMatch;

  return ctx.reply(
    `Карта "${cardName}" не найдена.\n\n${
      bestMatch.rating > 0.6 ? `Возможно, ты имел в виду: *${bestMatch.target}*` : 'Попробуй ещё раз.'
    }`,
    { parse_mode: 'Markdown' }
  );
};
