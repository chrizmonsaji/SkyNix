const { SlashCommandBuilder, PermissionFlagsBits, time } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Times out a user in the server')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to timeout')
        .setRequired(true)
    )
    .addIntegerOption(option => 
      option.setName('duration')
        .setDescription('Duration of timeout in minutes (1-40320)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(40320) // 28 days max
    )
    .addStringOption(option => 
      option.setName('reason')
        .setDescription('Reason for the timeout')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(user.id);
    
    // Check if user is trying to timeout themselves
    if (user.id === interaction.user.id) {
      const errorEmbed = Embed.error(
        'Cannot Timeout Yourself',
        'You cannot timeout yourself.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    // Check if user is trying to timeout the server owner
    if (user.id === interaction.guild.ownerId) {
      const errorEmbed = Embed.error(
        'Cannot Timeout Server Owner',
        'You cannot timeout the server owner.'
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
    
    // Check if member is already timed out
    if (member.isCommunicationDisabled()) {
      const errorEmbed = Embed.error(
        'User Already Timed Out',
        `${user.tag} is already timed out.`
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    try {
      // Calculate timeout duration in milliseconds
      const timeoutDuration = duration * 60 * 1000; // minutes to milliseconds
      
      // Apply timeout
      await member.timeout(timeoutDuration, reason);
      
      const successEmbed = Embed.success(
        'User Timed Out',
        `${user.tag} has been timed out for ${duration} minutes.`
      )
      .addFields(
        { name: 'User', value: user.tag, inline: true },
        { name: 'Moderator', value: interaction.user.tag, inline: true },
        { name: 'Duration', value: `${duration} minutes`, inline: true },
        { name: 'Reason', value: reason, inline: false },
        { name: 'Ends At', value: `<t:${Math.floor((Date.now() + timeoutDuration) / 1000)}:F>`, inline: false }
      );
      
      await interaction.reply({ embeds: [successEmbed] });
    } catch (error) {
      const errorEmbed = Embed.error(
        'Timeout Failed',
        `Could not timeout ${user.tag}. Make sure the bot has the necessary permissions.`
      );
      
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};