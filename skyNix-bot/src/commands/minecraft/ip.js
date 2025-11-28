const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../lib/embed.js');
const config = require('../../config/config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ip')
    .setDescription('Shows the Sky Realm S2 Minecraft server IP address'),
  
  async execute(interaction, client) {
    const ipEmbed = Embed.minecraft(
      'Sky Realm S2 Server IP',
      `**IP Address:** \`${config.minecraft.ip}\`\n**Port:** \`${config.minecraft.port}\`\n**Version:** ${config.minecraft.version}\n\nJoin us now and start your adventure!`
    );
    
    await interaction.reply({ embeds: [ipEmbed] });
  },
};