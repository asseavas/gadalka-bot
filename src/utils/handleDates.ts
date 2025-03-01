import { Context } from 'telegraf';
import { parseDate } from './parseDate';
import { calculateMatrix } from './calculateMatrix';
import { calculateCompatibility } from './calculateCompatibility';
import { DateParts, MatrixArcana } from '../types';
import { matrixOfDestiny } from '../data/matrix';

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

  const visitingCard1 = getArcana(compatibilityMatrix.visitingCard);
  const talents1 = getArcana(compatibilityMatrix.talents);
  const soulMission1 = getArcana(compatibilityMatrix.soulMission);
  const karmicTail1 = getArcana(compatibilityMatrix.karmicTail);
  const comfortZone1 = getArcana(compatibilityMatrix.comfortZone);

  return ctx.reply(
    `🔮 Совместимость по датам:\n\n` +
      `📅 *Первая дата:* ${dates[0]}\n` +
      `📅 *Вторая дата:* ${dates[1]}\n\n` +
      `✨ *Матрица совместимости:*\n\n` +
      `👩‍❤️‍👨 *Пара в глазах окружающих*:\n ${visitingCard1?.visitingCard}\n\n` +
      `⚡️ *Вдохновение для пары:*\n ${talents1?.talents}\n\n` +
      `💸 *Уязвимые зоны в финансах пары:*\n ${soulMission1?.soulMission}\n\n` +
      `🔥 *Испытания для отношений*:\n ${karmicTail1?.karmicTail}\n\n` +
      `💘 *Общая характеристика:*\n ${comfortZone1?.comfortZone}`,
    { parse_mode: 'Markdown' }
  );
};

const getArcana = (number: number): MatrixArcana | undefined => {
  return matrixOfDestiny.find((arcana) => arcana.number === number);
};
