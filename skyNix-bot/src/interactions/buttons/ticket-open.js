const { PermissionFlagsBits, ChannelType } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: {
    name: 'ticket-open'
  },
  
  async execute(interaction, client) {
    const userId = interaction.user.id;
    const guild = interaction.guild;
    
    // Check if user already has a ticket
    const existingTicket = guild.channels.cache.find(
      channel => 
        channel.name === `ticket-${userId}` && 
        channel.type === ChannelType.GuildText
    );
    
    if (existingTicket) {
      const errorEmbed = Embed.error(
        'Ticket Already Exists',
        `You already have a ticket open: ${existingTicket.toString()}`
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    try {
      // Create ticket channel
      const ticketChannel = await guild.channels.create({
        name: `ticket-${userId}`,
        type: ChannelType.GuildText,
        topic: `Ticket for ${interaction.user.tag} (${userId})`,
        parent: process.env.TICKET_CATEGORY_ID, // Optional: put tickets in a category
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: userId,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles],
          },
          // Add support role if configured
          ...(process.env.SUPPORT_ROLE_ID ? [{
            id: process.env.SUPPORT_ROLE_ID,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles],
          }] : [])
        ],
      });
      
      const successEmbed = Embed.success(
        'Ticket Created',
        `Your ticket has been created: ${ticketChannel.toString()}`
      );
      
      await interaction.reply({ embeds: [successEmbed], ephemeral: true });
      
      // Send welcome message in the ticket channel
      const welcomeEmbed = Embed.info(
        'Ticket Created',
        `Hello ${interaction.user.toString()}, a staff member will assist you shortly.\n\nPlease describe your issue in detail.`
      )
      .addFields(
        { name: 'User', value: interaction.user.toString(), inline: true },
        { name: 'Ticket ID', value: ticketChannel.id, inline: true }
      );
      
      const closeButton = {
        type: 2, // Component type for button
        style: 4, // Danger style
        label: 'Close Ticket',
        custom_id: 'ticket-close',
        emoji: '🔒'
      };
      
      await ticketChannel.send({ 
        embeds: [welcomeEmbed],
        components: [{ type: 1, components: [closeButton] }] 
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      
      const errorEmbed = Embed.error(
        'Ticket Creation Failed',
        'An error occurred while creating your ticket. Please contact an administrator.'
      );
      
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};