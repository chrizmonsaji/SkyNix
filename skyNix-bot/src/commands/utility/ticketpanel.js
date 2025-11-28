const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticketpanel')
    .setDescription('Creates a ticket panel with a button to open tickets')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  
  async execute(interaction, client) {
    const ticketEmbed = Embed.info(
      '🎫 Create a Ticket',
      'Click the button below to create a support ticket. A staff member will assist you shortly.'
    );

    const ticketButton = new ButtonBuilder()
      .setCustomId('ticket-open')
      .setLabel('Open Ticket')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🎫');

    const row = new ActionRowBuilder()
      .addComponents(ticketButton);

    await interaction.reply({ 
      embeds: [ticketEmbed], 
      components: [row],
      ephemeral: true
    });
  },
};