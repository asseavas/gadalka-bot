import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { tarotCards } from './src/data/tarot';
import { Card } from './src/types';
import stringSimilarity from 'string-similarity';

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
    'Вот что я умею:\n/card_of_the_day - Карта дня и совет\n/yesno - Задай вопрос и получи ответ "Да/Нет"\n/future - Расклад на будущее\n/card - Напиши название карты и получи ее значение и аффирмацию'
  );
});

bot.command('card_of_the_day', (ctx) => {
  const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
  const isUpright = Math.random() > 0.5;
  const position = isUpright ? 'прямое положение' : 'перевёрнутое положение';
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

bot.command('future', (ctx) => {
  const selectedCards: Card[] = [];

  while (selectedCards.length < 3) {
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];

    if (!selectedCards.includes(randomCard)) {
      selectedCards.push(randomCard);
    }
  }

  let message = '🔮 *Расклад на будущее:*\n\n';

  selectedCards.forEach((card, index) => {
    const isUpright = Math.random() > 0.5;
    const position = isUpright ? 'прямое положение' : 'перевёрнутое положение';
    const meaning = isUpright ? card.meaning_upright : card.meaning_reversed;

    message +=
      `🎴 *Карта ${index + 1}:* ${escapeMarkdown(card.name)} \\(${escapeMarkdown(position)}\\)\n` +
      `📜 *Значение:* ${escapeMarkdown(meaning)}\n` +
      `💡 *Совет:* ${escapeMarkdown(card.advice)}\n` +
      `⚠️ *Предупреждение:* ${escapeMarkdown(card.warning)}\n\n`;
  });

  ctx.replyWithMarkdownV2(message);
});

bot.command('card', (ctx) => {
  const cardName = ctx.message.text.split(' ').slice(1).join(' ').trim();

  if (!cardName) {
    return ctx.reply('Пожалуйста, укажи название карты после команды /card.');
  }

  const foundCard = tarotCards.find((c) => c.name.toLowerCase() === cardName.toLowerCase());

  if (!foundCard) {
    const matches = stringSimilarity.findBestMatch(
      cardName,
      tarotCards.map((c) => c.name)
    );

    const suggestions = matches.ratings
      .filter((r) => r.rating > 0.5)
      .slice(0, 3)
      .map((r) => `- ${r.target}`)
      .join('\n');

    const errorMessage =
      `Карта "${escapeMarkdown(cardName)}" не найдена\\.\n\n` +
      (suggestions ? `Возможно, ты имел в виду:\n${escapeMarkdown(suggestions)}` : 'Попробуй ещё раз\\.');

    return ctx.replyWithMarkdownV2(errorMessage);
  }

  const message =
    `🎴 *Карта:* ${escapeMarkdown(foundCard.name)}\n\n` +
    `📜 *Описание:* ${escapeMarkdown(foundCard.description)}\n\n` +
    `💫 *Аффирмация:* ${escapeMarkdown(foundCard.affirmation)}`;

  ctx.replyWithMarkdownV2(message);
});

bot.launch().catch((err) => {
  console.error('❌ Ошибка при запуске бота:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
