import express from 'express';
import { bot } from './src/bot';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('🤖 Bot is running and working!');
});

bot
  .launch()
  .then(() => {
    console.log('🤖 Bot has started successfully!');
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('❌ Error starting the bot:', err.message);
    } else {
      console.error('❌ Unknown error while starting the bot:', JSON.stringify(err));
    }
  });

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
