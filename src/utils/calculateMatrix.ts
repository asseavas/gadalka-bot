import { reduceToNumber } from './reduceToNumber';
import { DateParts, Matrix } from '../types';

export const calculateMatrix = ({ day, month, year }: DateParts): Matrix => {
  const visitingCard = reduceToNumber(day);
  const talents = month;
  const soulMission = reduceToNumber(
    year
      .toString()
      .split('')
      .reduce((a, b) => a + Number(b), 0)
  );
  const karmicTail = reduceToNumber(visitingCard + talents + soulMission);
  const comfortZone = reduceToNumber(visitingCard + talents + soulMission + karmicTail);

  return { visitingCard, talents, soulMission, karmicTail, comfortZone };
};
