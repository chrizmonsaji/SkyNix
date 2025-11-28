const { Events } = require('discord.js');
const Logger = require('../lib/logger.js');
const Embed = require('../lib/embed.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, client) {
    try {
      Logger.info(`New member joined: ${member.user.tag}`);
      
      // Get welcome channel from config
      const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
      if (!welcomeChannelId) {
        Logger.warning('WELCOME_CHANNEL_ID not set in .env file');
        return;
      }
      
      const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
      if (!welcomeChannel) {
        Logger.warning(`Welcome channel with ID ${welcomeChannelId} not found`);
        return;
      }
      
      // Create welcome embed
      const welcomeEmbed = Embed.info(
        'Welcome to Sky Realm S2!',
        `Welcome to the server, ${member.user.toString()}! 🎉\n\nWe're excited to have you join our Minecraft community. Don't forget to check out our rules and get started with /help to see what our bot can do!`
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Username', value: member.user.tag, inline: true },
        { name: 'Account Created', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: 'Join Position', value: `#${member.guild.memberCount}`, inline: true }
      );
      
      // Send welcome message
      await welcomeChannel.send({ embeds: [welcomeEmbed] });
    } catch (error) {
      Logger.error(`Error in guildMemberAdd event: ${error.message}`);
    }
  },
};