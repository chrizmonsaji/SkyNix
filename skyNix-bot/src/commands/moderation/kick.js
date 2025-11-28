const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user from the server')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to kick')
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(user.id);
    
    // Check if user is trying to kick themselves
    if (user.id === interaction.user.id) {
      const errorEmbed = Embed.error(
        'Cannot Kick Yourself',
        'You cannot kick yourself.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    // Check if user is trying to kick the server owner
    if (user.id === interaction.guild.ownerId) {
      const errorEmbed = Embed.error(
        'Cannot Kick Server Owner',
        'You cannot kick the server owner.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    // Check if member exists
    if (!member) {
      const errorEmbed = Embed.error(
        'User Not Found',
        'The specified user is not in this server.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    try {
      // Kick the user
      await member.kick(reason);
      
      const successEmbed = Embed.success(
        'User Kicked',
        `${user.tag} has been kicked from the server.`
      )
      .addFields(
        { name: 'User', value: user.tag, inline: true },
        { name: 'Moderator', value: interaction.user.tag, inline: true },
        { name: 'Reason', value: reason, inline: false }
      );
      
      await interaction.reply({ embeds: [successEmbed] });
    } catch (error) {
      const errorEmbed = Embed.error(
        'Kick Failed',
        `Could not kick ${user.tag}. Make sure the bot has the necessary permissions.`
      );
      
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};