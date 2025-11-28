const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Embed = require('../../lib/embed.js');
const config = require('../../config/config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Get links to vote for the Sky Realm S2 Minecraft server'),
  
  async execute(interaction, client) {
    const voteEmbed = Embed.minecraft(
      'Vote for Sky Realm S2',
      'Help us grow by voting for our server! Each vote helps us reach more players.'
    );

    // Create vote buttons
    const buttons = [];
    for (const [index, voteLink] of config.voting.voteLinks.entries()) {
      buttons.push(
        new ButtonBuilder()
          .setLabel(`Vote on ${voteLink.name}`)
          .setURL(voteLink.url)
          .setStyle(ButtonStyle.Link)
      );
    }

    // Create action rows (Discord allows up to 5 buttons per row)
    const actionRows = [];
    for (let i = 0; i < buttons.length; i += 5) {
      const row = new ActionRowBuilder().addComponents(buttons.slice(i, i + 5));
      actionRows.push(row);
    }

    await interaction.reply({ 
      embeds: [voteEmbed],
      components: actionRows 
    });
  },
};