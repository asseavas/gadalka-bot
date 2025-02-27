import { tarotCards } from '../data/tarot';
import stringSimilarity from 'string-similarity';

export const findCardResponse = (cardName: string) => {
  const foundCard = tarotCards.find((c) => c.name.toLowerCase() === cardName.toLowerCase());

  if (foundCard) {
    return `🎴 *Карта:* ${foundCard.name}\n\n📜 *Описание:* ${foundCard.description}\n\n💫 *Аффирмация:* ${foundCard.affirmation}`;
  }

  const bestMatch = stringSimilarity.findBestMatch(
    cardName,
    tarotCards.map((c) => c.name)
  ).bestMatch;

  return `Карта "${cardName}" не найдена.\n\n${
    bestMatch.rating > 0.6 ? `Возможно, ты имел в виду: *${bestMatch.target}*` : 'Попробуй ещё раз.'
  }`;
};
