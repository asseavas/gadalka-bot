export const getYesNoResponse = (question: string) => {
  const answer = Math.random() > 0.5 ? 'Да' : 'Нет';
  return `🎱 Вопрос: *${question}*\n\n🔮 Ответ: *${answer}*`;
};
