import { reduceToNumber } from './reduceToNumber';
import { Matrix } from '../types';

export const calculateCompatibility = (matrix1: Matrix, matrix2: Matrix): Matrix => {
  return {
    visitingCard: reduceToNumber(matrix1.visitingCard + matrix2.visitingCard),
    talents: reduceToNumber(matrix1.talents + matrix2.talents),
    soulMission: reduceToNumber(matrix1.soulMission + matrix2.soulMission),
    karmicTail: reduceToNumber(matrix1.karmicTail + matrix2.karmicTail),
    comfortZone: reduceToNumber(matrix1.comfortZone + matrix2.comfortZone),
  };
};
