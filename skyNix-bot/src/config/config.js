// SkyNix Bot Configuration
module.exports = {
  // Bot settings
  bot: {
    name: 'SkyNix',
    version: '1.0.0',
    description: 'A Discord bot for Sky Realm Minecraft server',
    color: '#8A2BE2', // Purple theme color
    footer: 'SkyNix Bot | Sky Realm S2'
  },
  
  // Minecraft server settings
  minecraft: {
    name: 'Sky Realm S2',
    ip: process.env.MINECRAFT_SERVER_IP || 'play.skyrealms2.com',
    port: parseInt(process.env.MINECRAFT_SERVER_PORT) || 19132,
    version: '1.20.0',
    maxPlayers: 100
  },
  
  // Ticket system settings
  tickets: {
    categoryName: 'Tickets',
    supportRoleId: process.env.SUPPORT_ROLE_ID || null,
    ticketLimit: 3
  },
  
  // Moderation settings
  moderation: {
    warnThreshold: 3,
    banThreshold: 5,
    timeoutDuration: 600000 // 10 minutes in milliseconds
  },
  
  // AI settings
  ai: {
    model: 'gpt-3.5-turbo',
    maxTokens: 1000
  },
  
  // Voting links
  voting: {
    voteLinks: [
      { name: 'Minecraft Server List', url: 'https://minecraft-server-list.com/server/play.skyrealms2.com' },
      { name: 'Planet Minecraft', url: 'https://www.planetminecraft.com/server/sky-realm-s2' }
    ]
  },
  
  // Map link
  map: {
    url: 'https://map.skyrealms2.com'
  }
};