const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Displays information about a user')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to get information about')
        .setRequired(false)
    ),
  
  async execute(interaction, client) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    
    const userInfo = {
      tag: user.tag,
      id: user.id,
      avatar: user.displayAvatarURL({ dynamic: true }),
      createdAt: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
      joinedAt: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : 'Not a member of this server',
      roles: member ? member.roles.cache.filter(r => r.id !== interaction.guild.id).map(r => r).join(' ') || 'None' : 'N/A'
    };
    
    const userEmbed = Embed.info(
      `User Info: ${userInfo.tag}`,
      `Here's the information about **${userInfo.tag}**`
    )
    .setThumbnail(userInfo.avatar)
    .addFields(
      { name: 'Username', value: userInfo.tag, inline: true },
      { name: 'ID', value: userInfo.id, inline: true },
      { name: 'Account Created', value: userInfo.createdAt, inline: false },
      { name: 'Joined Server', value: userInfo.joinedAt, inline: false },
      { name: 'Roles', value: userInfo.roles, inline: false }
    );
    
    await interaction.reply({ embeds: [userEmbed] });
  },
};