const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears a specified number of messages')
    .addIntegerOption(option => 
      option.setName('amount')
        .setDescription('Number of messages to delete (1-99)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(99)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  
  async execute(interaction, client) {
    const amount = interaction.options.getInteger('amount');
    
    try {
      // Defer reply since bulk delete is an async operation
      await interaction.deferReply({ ephemeral: true });
      
      // Delete messages
      const deleted = await interaction.channel.bulkDelete(amount, true);
      
      const successEmbed = Embed.success(
        'Messages Cleared',
        `Successfully deleted ${deleted.size} messages.`
      )
      .addFields(
        { name: 'Moderator', value: interaction.user.tag, inline: true },
        { name: 'Channel', value: interaction.channel.toString(), inline: true },
        { name: 'Amount', value: deleted.size.toString(), inline: true }
      );
      
      await interaction.editReply({ embeds: [successEmbed] });
      
      // Optionally send a follow-up message in the channel
      const infoEmbed = Embed.info(
        'Messages Cleared',
        `A moderator has cleared ${deleted.size} messages in this channel.`
      );
      
      const clearMessage = await interaction.channel.send({ embeds: [infoEmbed] });
      
      // Delete the info message after 5 seconds
      setTimeout(() => {
        clearMessage.delete().catch(() => {});
      }, 5000);
    } catch (error) {
      const errorEmbed = Embed.error(
        'Clear Failed',
        'Could not delete messages. Make sure the bot has the necessary permissions and messages are not older than 14 days.'
      );
      
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};