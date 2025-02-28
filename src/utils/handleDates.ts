import { Context } from 'telegraf';
import { parseDate } from './parseDate';
import { calculateMatrix } from './calculateMatrix';
import { calculateCompatibility } from './calculateCompatibility';
import { DateParts } from '../types';

export const handleDates = (ctx: Context, messageWithDates: string) => {
  const dates = messageWithDates.split(/\s+[и\/]\s+/);
  const parsedDates = dates.map(parseDate);

  if (dates.length !== 2) {
    return ctx.reply('Нужно две даты для магии! 🔮✨ Пример правильного ввода: *01.12.2004* и *20.06.2003*', {
      parse_mode: 'Markdown',
    });
  }

  if (parsedDates.includes(null)) {
    return ctx.reply(
      'Некорректный формат даты! 📆\n\n' +
        'Пример правильного ввода: *01.12.2004* и *20.06.2003*.\n' +
        'Попробуй снова! 🔮✨',
      { parse_mode: 'Markdown' }
    );
  }

  const [date1, date2] = parsedDates as [DateParts, DateParts];
  const matrix1 = calculateMatrix(date1);
  const matrix2 = calculateMatrix(date2);
  const compatibilityMatrix = calculateCompatibility(matrix1, matrix2);

  return ctx.reply(
    `🔮 Совместимость по датам:\n\n` +
      `📅 *Первая дата:* ${dates[0]}\n` +
      `📅 *Вторая дата:* ${dates[1]}\n\n` +
      `✨ *Матрица совместимости:*\n` +
      `Пара в глазах окружающих: ${compatibilityMatrix.visitingCard}\n` +
      `Вдохновение для пары: ${compatibilityMatrix.talents}\n` +
      `Финансовая карма: ${compatibilityMatrix.soulMission}\n` +
      `Любовная карма: ${compatibilityMatrix.karmicTail}\n` +
      `Общая характеристика: ${compatibilityMatrix.comfortZone}`,
    { parse_mode: 'Markdown' }
  );
};
