const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Embed = require('../../lib/embed.js');
const emojis = require('../../config/emojis.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows a list of all available commands'),
  
  async execute(interaction, client) {
    const categories = {
      utility: {
        name: 'Utility',
        emoji: emojis.utility,
        commands: []
      },
      moderation: {
        name: 'Moderation', 
        emoji: emojis.moderation,
        commands: []
      },
      minecraft: {
        name: 'Minecraft',
        emoji: emojis.minecraft,
        commands: []
      },
      fun: {
        name: 'Fun',
        emoji: emojis.fun,
        commands: []
      },
      ai: {
        name: 'AI',
        emoji: emojis.ai,
        commands: []
      },
      admin: {
        name: 'Admin',
        emoji: emojis.admin,
        commands: []
      }
    };

    // Categorize commands
    for (const [name, command] of client.commands) {
      if (command.category && categories[command.category]) {
        categories[command.category].commands.push({
          name: name,
          description: command.data.description
        });
      }
    }

    // Create help embed
    let description = 'Welcome to SkyNix Bot! Here are all the commands you can use:\n\n';
    
    for (const [key, category] of Object.entries(categories)) {
      if (category.commands.length > 0) {
        description += `**${category.emoji} ${category.name}**\n`;
        for (const cmd of category.commands) {
          description += `• **/${cmd.name}** - ${cmd.description}\n`;
        }
        description += '\n';
      }
    }

    const helpEmbed = Embed.info(
      'Help - SkyNix Bot Commands',
      description
    )
    .addFields(
      { name: 'Need Support?', value: 'If you need help with the bot, please contact an administrator.' },
      { name: 'Minecraft Server', value: 'Join Sky Realm S2: `play.skyrealms2.com`' }
    );

    // Create support button
    const supportButton = new ButtonBuilder()
      .setLabel('Support Server')
      .setURL('https://discord.gg/skyrealm') // Replace with actual invite
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
      .addComponents(supportButton);

    await interaction.reply({ 
      embeds: [helpEmbed],
      components: [row],
      ephemeral: true 
    });
  },
};