import { tarotCards } from '../data/tarot';
import { Card } from '../types';

export const getRandomCard = (): { card: Card; isUpright: boolean } => {
  const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];

  return { card, isUpright: Math.random() > 0.5 };
};
