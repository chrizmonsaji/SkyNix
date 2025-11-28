const chalk = require('chalk');

class Logger {
  /**
   * Log info message
   * @param {string} message - Message to log
   */
  static info(message) {
    console.log(chalk.blue(`[INFO] ${new Date().toISOString()} - ${message}`));
  }

  /**
   * Log success message
   * @param {string} message - Message to log
   */
  static success(message) {
    console.log(chalk.green(`[SUCCESS] ${new Date().toISOString()} - ${message}`));
  }

  /**
   * Log warning message
   * @param {string} message - Message to log
   */
  static warning(message) {
    console.log(chalk.yellow(`[WARNING] ${new Date().toISOString()} - ${message}`));
  }

  /**
   * Log error message
   * @param {string} message - Message to log
   */
  static error(message) {
    console.log(chalk.red(`[ERROR] ${new Date().toISOString()} - ${message}`));
  }

  /**
   * Log debug message
   * @param {string} message - Message to log
   */
  static debug(message) {
    console.log(chalk.gray(`[DEBUG] ${new Date().toISOString()} - ${message}`));
  }
}

module.exports = Logger;