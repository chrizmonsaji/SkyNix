const { Events } = require('discord.js');
const Logger = require('../lib/logger.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    Logger.success(`Ready! Logged in as ${client.user.tag}`);
    
    // Set the bot's presence
    client.user.setPresence({
      activities: [{ name: 'Sky Realm S2 — /help', type: 3 }], // 3 = Watching
      status: 'online',
    });
    
    Logger.info(`Bot is now watching Sky Realm S2 with ${client.guilds.cache.size} guilds and ${client.users.cache.size} users`);
  },
};