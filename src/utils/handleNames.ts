import { Context } from 'telegraf';

export const handleNames = (ctx: Context, messageWithNames: string) => {
  const names = messageWithNames.split(/\s+[и\/]\s+/);

  if (names.length === 2) {
    const compatibility = Math.floor(Math.random() * 100) + 1;

    return ctx.reply(`🌙 Имена: *${messageWithNames}*\n\n💞 Совместимость: *${compatibility}%*`, {
      parse_mode: 'Markdown',
    });
  }
};
