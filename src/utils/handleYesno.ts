import { Context } from 'telegraf';

export const handleYesno = (ctx: Context, question: string) => {
  const answer = Math.random() > 0.5 ? 'Да' : 'Нет';

  return ctx.reply(`🎱 Вопрос: *${question}*\n\n🔮 Ответ: *${answer}*`, { parse_mode: 'Markdown' });
};
