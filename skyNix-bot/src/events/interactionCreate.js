const { Events } = require('discord.js');
const Logger = require('../lib/logger.js');
const Embed = require('../lib/embed.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    try {
      // Handle slash commands
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) {
          Logger.warning(`Command ${interaction.commandName} not found`);
          return;
        }

        try {
          await command.execute(interaction, client);
          Logger.info(`Command executed: ${interaction.commandName} by ${interaction.user.tag}`);
        } catch (error) {
          Logger.error(`Error executing command ${interaction.commandName}: ${error.message}`);
          
          // Send error message to user
          const errorEmbed = Embed.error(
            'Command Error',
            '❌ An error occurred while executing this command.'
          );
          
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true }).catch(() => {
            // If reply fails, try editing the original reply
            interaction.editReply({ embeds: [errorEmbed] }).catch(() => {
              // If both fail, log the error
              Logger.error('Could not send error message to user');
            });
          });
        }
      }
      
      // Handle button interactions
      else if (interaction.isButton()) {
        const button = client.buttons.get(interaction.customId);
        
        if (!button) {
          Logger.warning(`Button ${interaction.customId} not found`);
          return;
        }
        
        try {
          await button.execute(interaction, client);
          Logger.info(`Button executed: ${interaction.customId} by ${interaction.user.tag}`);
        } catch (error) {
          Logger.error(`Error executing button ${interaction.customId}: ${error.message}`);
          
          const errorEmbed = Embed.error(
            'Button Error',
            '❌ An error occurred while executing this button.'
          );
          
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true }).catch(() => {
            interaction.editReply({ embeds: [errorEmbed] }).catch(() => {
              Logger.error('Could not send button error message to user');
            });
          });
        }
      }
      
      // Handle select menu interactions
      else if (interaction.isStringSelectMenu()) {
        const selectMenu = client.selectMenus.get(interaction.customId);
        
        if (!selectMenu) {
          Logger.warning(`Select menu ${interaction.customId} not found`);
          return;
        }
        
        try {
          await selectMenu.execute(interaction, client);
          Logger.info(`Select menu executed: ${interaction.customId} by ${interaction.user.tag}`);
        } catch (error) {
          Logger.error(`Error executing select menu ${interaction.customId}: ${error.message}`);
          
          const errorEmbed = Embed.error(
            'Select Menu Error',
            '❌ An error occurred while executing this selection.'
          );
          
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true }).catch(() => {
            interaction.editReply({ embeds: [errorEmbed] }).catch(() => {
              Logger.error('Could not send select menu error message to user');
            });
          });
        }
      }
      
      // Handle modal submissions
      else if (interaction.isModalSubmit()) {
        const modal = client.modals.get(interaction.customId);
        
        if (!modal) {
          Logger.warning(`Modal ${interaction.customId} not found`);
          return;
        }
        
        try {
          await modal.execute(interaction, client);
          Logger.info(`Modal submitted: ${interaction.customId} by ${interaction.user.tag}`);
        } catch (error) {
          Logger.error(`Error executing modal ${interaction.customId}: ${error.message}`);
          
          const errorEmbed = Embed.error(
            'Modal Error',
            '❌ An error occurred while submitting this form.'
          );
          
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true }).catch(() => {
            interaction.editReply({ embeds: [errorEmbed] }).catch(() => {
              Logger.error('Could not send modal error message to user');
            });
          });
        }
      }
    } catch (error) {
      Logger.error(`Unexpected error in interactionCreate: ${error.message}`);
    }
  },
};