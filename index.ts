import express from 'express';
import { bot } from './src/bot';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = `${process.env.WEBHOOK_DOMAIN}/webhook`;

app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Error handling webhook update:', error);
    res.sendStatus(500);
  }
});

bot.telegram.setWebhook(WEBHOOK_URL).then(() => {
  console.log(`✅ Webhook has been set: ${WEBHOOK_URL}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
