const { EmbedBuilder } = require('discord.js');
const config = require('../config/config.js');
const emojis = require('../config/emojis.json');

class Embed {
  /**
   * Creates a success embed
   * @param {string} title - Embed title
   * @param {string} description - Embed description
   * @param {Object} options - Additional options
   * @returns {EmbedBuilder}
   */
  static success(title, description, options = {}) {
    return new EmbedBuilder()
      .setTitle(`${emojis.success} ${title}`)
      .setDescription(description)
      .setColor('#57F287') // Green
      .setFooter({ text: options.footer || config.bot.footer })
      .setTimestamp(options.timestamp !== false ? new Date() : null);
  }

  /**
   * Creates an error embed
   * @param {string} title - Embed title
   * @param {string} description - Embed description
   * @param {Object} options - Additional options
   * @returns {EmbedBuilder}
   */
  static error(title, description, options = {}) {
    return new EmbedBuilder()
      .setTitle(`${emojis.error} ${title}`)
      .setDescription(description)
      .setColor('#ED4245') // Red
      .setFooter({ text: options.footer || config.bot.footer })
      .setTimestamp(options.timestamp !== false ? new Date() : null);
  }

  /**
   * Creates a warning embed
   * @param {string} title - Embed title
   * @param {string} description - Embed description
   * @param {Object} options - Additional options
   * @returns {EmbedBuilder}
   */
  static warning(title, description, options = {}) {
    return new EmbedBuilder()
      .setTitle(`${emojis.warning} ${title}`)
      .setDescription(description)
      .setColor('#FEE75C') // Yellow
      .setFooter({ text: options.footer || config.bot.footer })
      .setTimestamp(options.timestamp !== false ? new Date() : null);
  }

  /**
   * Creates an info embed with purple theme
   * @param {string} title - Embed title
   * @param {string} description - Embed description
   * @param {Object} options - Additional options
   * @returns {EmbedBuilder}
   */
  static info(title, description, options = {}) {
    return new EmbedBuilder()
      .setTitle(`${emojis.info} ${title}`)
      .setDescription(description)
      .setColor(config.bot.color) // Purple
      .setFooter({ text: options.footer || config.bot.footer })
      .setTimestamp(options.timestamp !== false ? new Date() : null);
  }

  /**
   * Creates a Minecraft-themed embed
   * @param {string} title - Embed title
   * @param {string} description - Embed description
   * @param {Object} options - Additional options
   * @returns {EmbedBuilder}
   */
  static minecraft(title, description, options = {}) {
    return new EmbedBuilder()
      .setTitle(`${emojis.minecraft} ${title}`)
      .setDescription(description)
      .setColor('#7CFC00') // Green like Minecraft
      .setFooter({ text: options.footer || `${config.minecraft.name} Server Info` })
      .setTimestamp(options.timestamp !== false ? new Date() : null);
  }

  /**
   * Creates a generic embed with custom color
   * @param {string} title - Embed title
   * @param {string} description - Embed description
   * @param {string} color - Embed color in hex
   * @param {Object} options - Additional options
   * @returns {EmbedBuilder}
   */
  static custom(title, description, color, options = {}) {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setFooter({ text: options.footer || config.bot.footer })
      .setTimestamp(options.timestamp !== false ? new Date() : null);
  }
}

module.exports = Embed;