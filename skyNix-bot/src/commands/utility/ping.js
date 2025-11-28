const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the bot\'s ping and API latency'),
  
  async execute(interaction, client) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    
    const botLatency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = client.ws.ping;
    
    const pingEmbed = Embed.info(
      `${process.env.BOT_EMOJI || '🏓'} Pong!`,
      `**Bot Latency:** ${botLatency}ms\n**API Latency:** ${apiLatency}ms`
    );
    
    await interaction.editReply({ embeds: [pingEmbed] });
  },
};