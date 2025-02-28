export interface Card {
  name: string;
  description: string;
  meaning_upright: string;
  meaning_reversed: string;
  image: string;
  advice: string;
  warning: string;
  affirmation: string;
}

export type DateParts = { day: number; month: number; year: number };

export type Matrix = {
  visitingCard: number;
  talents: number;
  soulMission: number;
  karmicTail: number;
  comfortZone: number;
};
