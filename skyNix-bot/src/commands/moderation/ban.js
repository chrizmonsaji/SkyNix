const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user from the server')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(user.id);
    
    // Check if user is trying to ban themselves
    if (user.id === interaction.user.id) {
      const errorEmbed = Embed.error(
        'Cannot Ban Yourself',
        'You cannot ban yourself.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    // Check if user is trying to ban the server owner
    if (user.id === interaction.guild.ownerId) {
      const errorEmbed = Embed.error(
        'Cannot Ban Server Owner',
        'You cannot ban the server owner.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    try {
      // Ban the user
      await interaction.guild.members.ban(user, { reason: reason });
      
      const successEmbed = Embed.success(
        'User Banned',
        `${user.tag} has been banned from the server.`
      )
      .addFields(
        { name: 'User', value: user.tag, inline: true },
        { name: 'Moderator', value: interaction.user.tag, inline: true },
        { name: 'Reason', value: reason, inline: false }
      );
      
      await interaction.reply({ embeds: [successEmbed] });
    } catch (error) {
      const errorEmbed = Embed.error(
        'Ban Failed',
        `Could not ban ${user.tag}. Make sure the bot has the necessary permissions.`
      );
      
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};