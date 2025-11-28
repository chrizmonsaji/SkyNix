const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View warnings for a user')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to view warnings for')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  
  async execute(interaction, client) {
    const user = interaction.options.getUser('user') || interaction.user;
    
    // In a real implementation, you would fetch warnings from a database
    // For now, we'll simulate that the user has no warnings
    const warnings = []; // This would come from a database in a real bot
    
    let description;
    let color;
    
    if (warnings.length === 0) {
      description = `${user.tag} has no warnings.`;
      color = '#57F287'; // Green
    } else {
      description = `${user.tag} has ${warnings.length} warning(s):\n\n`;
      for (let i = 0; i < warnings.length; i++) {
        const warning = warnings[i];
        description += `**#${i + 1}** - ${warning.reason} (by ${warning.moderator}) - <t:${Math.floor(warning.timestamp / 1000)}:R>\n`;
      }
      color = '#FEE75C'; // Yellow
    }
    
    const warningsEmbed = Embed.custom(
      'User Warnings',
      description,
      color
    )
    .addFields(
      { name: 'User', value: user.tag, inline: true },
      { name: 'ID', value: user.id, inline: true }
    );
    
    await interaction.reply({ embeds: [warningsEmbed] });
  },
};