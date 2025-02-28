import { isValid, parse } from 'date-fns';
import { DateParts } from '../types';

export const parseDate = (dateStr: string): DateParts | null => {
  const regex = /^\d{1,2}\.\d{2}\.\d{4}$/;

  if (!regex.test(dateStr)) return null;

  const date = parse(dateStr, 'dd.MM.yyyy', new Date());

  if (!isValid(date)) return null;

  return { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
};
