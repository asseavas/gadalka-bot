import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { tarotCards } from './src/data/tarot';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN as string);

console.log('🤖 Бот запущен!');

const escapeMarkdown = (text: string) => {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
};

bot.start((ctx) => {
  ctx.reply('Привет! Я бот-гадалка. Напиши /help, чтобы узнать, что я умею ✨');
});

bot.help((ctx) => {
  ctx.reply(
    'Вот что я умею:\n/card_of_the_day - Карта дня и совет\n/yesno - Задай вопрос и получи ответ "Да/Нет"\n/future - Расклад на будущее\n/about_card - Значение карты и аффирмация'
  );
});

bot.command('card_of_the_day', (ctx) => {
  const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
  const isUpright = Math.random() > 0.5;
  const position = isUpright ? 'прямое значение' : 'перевёрнутое значение';
  const meaning = isUpright ? randomCard.meaning_upright : randomCard.meaning_reversed;

  const message =
    `🎴 Карта дня: *${escapeMarkdown(randomCard.name)}* \\(${escapeMarkdown(position)}\\)\n\n` +
    `📜 *Описание:* ${escapeMarkdown(randomCard.description)}\n\n` +
    `🔮 *Значение:* ${escapeMarkdown(meaning)}\n\n` +
    `✨ *Совет:* ${escapeMarkdown(randomCard.advice)}`;

  ctx.replyWithMarkdownV2(message);
});

bot.command('yesno', (ctx) => {
  const question = ctx.message.text.split(' ').slice(1).join(' ');
  if (!question) {
    return ctx.reply('Пожалуйста, задай вопрос после команды /yesno.');
  }

  const answer = Math.random() > 0.5 ? 'Да' : 'Нет';
  ctx.reply(`🎱 Вопрос: *${question}*\n\n🔮 Ответ: *${answer}*`, { parse_mode: 'Markdown' });
});

bot.launch().catch((err) => {
  console.error('❌ Ошибка при запуске бота:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
