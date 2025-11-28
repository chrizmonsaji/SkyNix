const Embed = require('../../lib/embed.js');

module.exports = {
  data: {
    name: 'ticket-close-confirm' // This will match the custom_id pattern
  },
  
  async execute(interaction, client) {
    const channel = interaction.channel;
    
    // Verify this is a ticket channel
    if (!channel.name.startsWith('ticket-')) {
      const errorEmbed = Embed.error(
        'Invalid Channel',
        'This command can only be used in ticket channels.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    try {
      // Delete the channel
      await channel.delete('Ticket closed by user');
      
      // Send confirmation to user (if possible)
      const successEmbed = Embed.success(
        'Ticket Closed',
        'Your ticket has been successfully closed and the channel has been deleted.'
      );
      
      // Try to send a DM to the user
      try {
        await interaction.user.send({ embeds: [successEmbed] });
      } catch (dmError) {
        // If DM fails, just reply to the interaction
        await interaction.reply({ embeds: [successEmbed], ephemeral: true });
      }
    } catch (error) {
      console.error('Error closing ticket:', error);
      
      const errorEmbed = Embed.error(
        'Ticket Close Failed',
        'An error occurred while deleting the ticket channel.'
      );
      
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};