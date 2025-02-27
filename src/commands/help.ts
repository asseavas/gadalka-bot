import { Telegraf } from 'telegraf';

export const helpCommand = (bot: Telegraf) => {
  bot.help((ctx) => {
    ctx.reply(
      '✨ Вот что я умею:\n\n' +
        '*/card_of_the_day* – Карта дня с советом\n' +
        '*/yesno* – Ответ "Да" или "Нет" на твой вопрос\n' +
        '*/future* – Расклад на будущее (3 карты)\n' +
        '*/card* – Значение карты и аффирмация\n' +
        '*/names* – Процент совместимости по именам\n' +
        '*/dates* – Совместимость по датам рождения\n\n' +
        'Кстати, можешь просто написать *Гадалка*, и я откликнусь! 🔮',
      { parse_mode: 'Markdown' }
    );
  });
};
