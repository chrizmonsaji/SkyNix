const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays information about the current server'),
  
  async execute(interaction, client) {
    const guild = interaction.guild;
    
    const serverEmbed = Embed.info(
      `Server Info: ${guild.name}`,
      `Here's the information about **${guild.name}**`
    )
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .addFields(
      { name: 'Server Name', value: guild.name, inline: true },
      { name: 'Server ID', value: guild.id, inline: true },
      { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
      { name: 'Members', value: `${guild.memberCount} members`, inline: true },
      { name: 'Channels', value: `${guild.channels.cache.size} channels`, inline: true },
      { name: 'Roles', value: `${guild.roles.cache.size} roles`, inline: true },
      { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
      { name: 'Verification Level', value: guild.verificationLevel, inline: true },
      { name: 'Boosts', value: `${guild.premiumSubscriptionCount} boosts`, inline: true }
    );
    
    await interaction.reply({ embeds: [serverEmbed] });
  },
};