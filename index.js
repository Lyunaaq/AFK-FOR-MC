const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // <- 改成 8080，避免 3000 被佔用

// --- AFK BOT SETUP ---
const bot = mineflayer.createBot({
  host: "rubychanhaiiiii.aternos.me",
  port: 31800,
  username: "afk__xz1p_" + Math.floor(Math.random() * 10000), // <- 隨機名稱
  version: "1.21.8"
});

bot.on('spawn', () => {
  console.log('✅ Bot joined the server.');

  // Jump every 30 sec to avoid AFK kick
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 300);
  }, 30000);

  // Move left/right every 45 sec
  let toggle = false;
  setInterval(() => {
    toggle = !toggle;
    bot.setControlState('left', toggle);
    bot.setControlState('right', !toggle);
    setTimeout(() => bot.clearControlStates(), 500);
  }, 45000);
});

bot.on('end', () => console.log('❌ Bot disconnected.'));
bot.on('error', err => console.error('❗ Bot error:', err));

// --- EXPRESS KEEPALIVE SERVER ---
app.get('/', (req, res) => res.send('AFK Bot is alive.'));
app.listen(port, () => console.log(`🌐 Web server running on port ${port}`));
