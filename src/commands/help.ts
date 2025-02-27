import { Telegraf } from 'telegraf';

export const helpCommand = (bot: Telegraf) => {
  bot.help((ctx) => {
    ctx.reply(
      'Вот что я умею:\n/card_of_the_day - Карта дня и совет\n/yesno - Ответ "Да/Нет" на вопрос\n' +
        '/future - Расклад на будущее\n/card - Значение карты аффирмация\n' +
        '/dates - Совместимость по датам\n/names - Совместимость по именам'
    );
  });
};
