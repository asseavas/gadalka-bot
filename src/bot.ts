import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { tarotCards } from './data/tarot';
import { Card } from './types';
import stringSimilarity from 'string-similarity';
import { escapeMarkdown } from './utils/escapeMarkdown';
import { getRandomCard } from './utils/getRandomCards';

dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error('❌ BOT_TOKEN is missing in .env file');
}

export const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => {
  ctx.reply('Привет! Я бот-гадалка. Напиши /help, чтобы узнать, что я умею ✨');
});

bot.help((ctx) => {
  ctx.reply(
    'Вот что я умею:\n/card_of_the_day - Карта дня и совет\n/yesno - Задай вопрос и получи ответ "Да/Нет"\n/future - Расклад на будущее\n/card - Напиши название карты и получи ее значение и аффирмацию'
  );
});

bot.command('card_of_the_day', (ctx) => {
  const { card, isUpright } = getRandomCard();
  const position = isUpright ? 'прямое положение' : 'перевёрнутое положение';
  const meaning = isUpright ? card.meaning_upright : card.meaning_reversed;

  ctx.replyWithMarkdownV2(
    `🎴 Карта дня: *${escapeMarkdown(card.name)}* \\(${escapeMarkdown(position)}\\)\n\n` +
      `📜 *Описание:* ${escapeMarkdown(card.description)}\n\n` +
      `🔮 *Значение:* ${escapeMarkdown(meaning)}\n\n` +
      `✨ *Совет:* ${escapeMarkdown(card.advice)}`
  );
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
  const selectedCards = new Set<Card>();

  while (selectedCards.size < 3) {
    selectedCards.add(getRandomCard().card);
  }

  const message = Array.from(selectedCards)
    .map((card, index) => {
      const { isUpright } = getRandomCard();
      const position = isUpright ? 'прямое положение' : 'перевёрнутое положение';
      const meaning = isUpright ? card.meaning_upright : card.meaning_reversed;

      return (
        `🎴 *Карта ${index + 1}:* ${escapeMarkdown(card.name)} \\(${escapeMarkdown(position)}\\)\n` +
        `📜 *Значение:* ${escapeMarkdown(meaning)}\n` +
        `💡 *Совет:* ${escapeMarkdown(card.advice)}\n` +
        `⚠️ *Предупреждение:* ${escapeMarkdown(card.warning)}\n\n`
      );
    })
    .join('');

  ctx.replyWithMarkdownV2(`🔮 *Расклад на будущее:*\n\n${message}`);
});

bot.command('card', (ctx) => {
  const cardName = ctx.message.text.split(' ').slice(1).join(' ').trim();

  if (!cardName) return ctx.reply('Пожалуйста, укажи название карты после команды /card.');

  const foundCard = tarotCards.find((c) => c.name.toLowerCase() === cardName.toLowerCase());

  if (foundCard) {
    return ctx.replyWithMarkdownV2(
      `🎴 *Карта:* ${escapeMarkdown(foundCard.name)}\n\n` +
        `📜 *Описание:* ${escapeMarkdown(foundCard.description)}\n\n` +
        `💫 *Аффирмация:* ${escapeMarkdown(foundCard.affirmation)}`
    );
  }

  const bestMatch = stringSimilarity.findBestMatch(
    cardName,
    tarotCards.map((c) => c.name)
  ).bestMatch;

  return ctx.replyWithMarkdownV2(
    `Карта "${escapeMarkdown(cardName)}" не найдена\\.\n\n` +
      (bestMatch.rating > 0.6
        ? `Возможно, ты имел в виду: *${escapeMarkdown(bestMatch.target)}*`
        : 'Попробуй ещё раз\\.')
  );
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
