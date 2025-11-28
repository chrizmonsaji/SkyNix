const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Embed = require('../../lib/embed.js');
const config = require('../../config/config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('map')
    .setDescription('Get the link to the Sky Realm S2 interactive map'),
  
  async execute(interaction, client) {
    const mapEmbed = Embed.minecraft(
      'Sky Realm S2 Interactive Map',
      `Explore our world on our interactive map! See builds, player locations, and more.\n\n[Visit the Map](${config.map.url})`
    );

    const mapButton = new ButtonBuilder()
      .setLabel('Open Map')
      .setURL(config.map.url)
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
      .addComponents(mapButton);

    await interaction.reply({ 
      embeds: [mapEmbed],
      components: [row]
    });
  },
};