const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../lib/embed.js');
const MCStatus = require('../../lib/mcStatus.js');
const config = require('../../config/config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Checks the status of the Sky Realm S2 Minecraft server'),
  
  async execute(interaction, client) {
    await interaction.deferReply();
    
    try {
      const status = await MCStatus.getStatus(config.minecraft.ip, config.minecraft.port);
      
      let statusEmbed;
      if (status.online) {
        statusEmbed = Embed.minecraft(
          'Sky Realm S2 Status',
          `**Status:** Online\n**MOTD:** ${status.motd}\n**Players:** ${status.players.online}/${status.players.max}\n**Version:** ${status.version}\n**Latency:** ${status.latency}ms`
        );
      } else {
        statusEmbed = Embed.error(
          'Sky Realm S2 Status',
          `**Status:** Offline\n**Error:** ${status.error}`
        );
      }
      
      await interaction.editReply({ embeds: [statusEmbed] });
    } catch (error) {
      const errorEmbed = Embed.error(
        'Status Check Failed',
        'Could not retrieve server status. Please try again later.'
      );
      
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};