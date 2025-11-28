const { PermissionFlagsBits, ChannelType } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: {
    name: 'ticket-close'
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
      // Confirmation message
      const confirmEmbed = Embed.warning(
        'Confirm Ticket Closure',
        'Are you sure you want to close this ticket? This will delete the channel and all messages.'
      );
      
      // Create confirmation buttons
      const confirmButton = {
        type: 2,
        style: 4, // Danger
        label: 'Yes, Close',
        custom_id: `ticket-close-confirm-${interaction.user.id}`,
        emoji: '✅'
      };
      
      const cancelButton = {
        type: 2,
        style: 2, // Secondary
        label: 'Cancel',
        custom_id: `ticket-cancel-${interaction.user.id}`,
        emoji: '❌'
      };
      
      await interaction.reply({ 
        embeds: [confirmEmbed],
        components: [{ type: 1, components: [confirmButton, cancelButton] }],
        ephemeral: true 
      });
    } catch (error) {
      console.error('Error in ticket close interaction:', error);
      
      const errorEmbed = Embed.error(
        'Ticket Close Failed',
        'An error occurred while processing your request.'
      );
      
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};