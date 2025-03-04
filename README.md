# Gadalka Bot 🤖  

A Telegram bot for tarot readings and compatibility analysis, built with Node.js, TypeScript, and Telegraf.  

💬 Try the bot: [Tarot Gadalka Bot](https://t.me/tarot_gadalka_bot)  

## Features 🔮 
- `/help` - Click to see available commands  
- `/card_of_the_day` - Draw a daily tarot card with advice  
- `/yesno` - Get a simple "Yes" or "No" answer  
- `/future` - Three-card tarot reading for the future  
- `/card` - Get the meaning and affirmation of a tarot card  
- `/names` - Random compatibility percentage based on names  
- `/dates` - Compatibility analysis based on birth dates  

## Installation 🛠

1. Clone the repository:  
   ```bash
   git clone https://github.com/asseavas/gadalka-bot.git
   cd yourbot
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Create a `.env` file based on `.env.example`:  
   ```plaintext
   BOT_TOKEN=your_bot_token_here  
   PORT=your_port_here  
   WEBHOOK_DOMAIN=your_webhook_domain_here  
   ```  

## Webhooks vs. Polling 🌐

This bot is designed to run on webhooks. Make sure to set up your `WEBHOOK_DOMAIN` in the `.env` file and configure it properly.  

If you don’t have a domain for a webhook, replace all webhook-related code in `index.ts` with:  
```typescript
bot.launch().catch((err) => {
  console.error('❌ Error when launching the bot:', err);
});
```  

Then, you can start the bot locally without webhooks.  

## Running the Bot 🚀  

For development (without building):  
```bash
npm run dev
```
