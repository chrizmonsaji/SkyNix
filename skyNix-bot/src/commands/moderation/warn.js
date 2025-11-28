const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a user for breaking server rules')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to warn')
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('reason')
        .setDescription('Reason for the warning')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const member = interaction.guild.members.cache.get(user.id);
    
    // Check if user is trying to warn themselves
    if (user.id === interaction.user.id) {
      const errorEmbed = Embed.error(
        'Cannot Warn Yourself',
        'You cannot warn yourself.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    // Check if user is trying to warn the server owner
    if (user.id === interaction.guild.ownerId) {
      const errorEmbed = Embed.error(
        'Cannot Warn Server Owner',
        'You cannot warn the server owner.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    try {
      // In a real implementation, you would store warnings in a database
      // For now, we'll just send a message
      const warnEmbed = Embed.warning(
        'User Warned',
        `${user.tag} has been warned.`
      )
      .addFields(
        { name: 'User', value: user.tag, inline: true },
        { name: 'Moderator', value: interaction.user.tag, inline: true },
        { name: 'Reason', value: reason, inline: false }
      );
      
      await interaction.reply({ embeds: [warnEmbed] });
      
      // Try to send a DM to the user
      try {
        const dmEmbed = Embed.warning(
          'You Have Been Warned',
          `You have received a warning in ${interaction.guild.name}`
        )
        .addFields(
          { name: 'Moderator', value: interaction.user.tag, inline: true },
          { name: 'Reason', value: reason, inline: false }
        );
        
        await user.send({ embeds: [dmEmbed] });
      } catch (dmError) {
        // If DM fails, just send in the channel
        await interaction.followUp({ 
          content: `${user.toString()}, you have received a warning.`,
          embeds: [warnEmbed],
          ephemeral: true 
        });
      }
    } catch (error) {
      const errorEmbed = Embed.error(
        'Warn Failed',
        `Could not warn ${user.tag}.`
      );
      
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};