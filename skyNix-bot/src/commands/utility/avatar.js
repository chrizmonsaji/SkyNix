const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Displays a user\'s avatar')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to get the avatar of')
        .setRequired(false)
    ),
  
  async execute(interaction, client) {
    const user = interaction.options.getUser('user') || interaction.user;
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 512 });
    
    const avatarEmbed = Embed.info(
      `${user.username}'s Avatar`,
      `[Download Avatar](${avatarURL})`
    )
    .setImage(avatarURL);
    
    await interaction.reply({ embeds: [avatarEmbed] });
  },
};