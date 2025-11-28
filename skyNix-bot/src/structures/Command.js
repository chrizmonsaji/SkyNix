/**
 * Base Command Structure
 */
class Command {
  /**
   * @param {Object} options - Command options
   * @param {string} options.name - Command name
   * @param {string} options.description - Command description
   * @param {Array} options.options - Command options
   * @param {boolean} options.guildOnly - Whether command can only be used in guilds
   * @param {string} options.category - Command category
   */
  constructor(options = {}) {
    this.name = options.name;
    this.description = options.description;
    this.options = options.options || [];
    this.guildOnly = options.guildOnly !== undefined ? options.guildOnly : true;
    this.category = options.category || 'misc';
  }
}

module.exports = Command;