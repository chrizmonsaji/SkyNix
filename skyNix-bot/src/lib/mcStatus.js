const mcUtil = require('minecraft-server-util');

class MCStatus {
  /**
   * Get Minecraft server status
   * @param {string} host - Server host
   * @param {number} port - Server port
   * @returns {Promise<Object>} Server status information
   */
  static async getStatus(host, port = 19132) {
    try {
      // Try Bedrock edition first (1.14+)
      const status = await mcUtil.statusBedrock(host, { port });
      return {
        online: true,
        host,
        port,
        motd: status.motd,
        players: {
          online: status.players.online,
          max: status.players.max
        },
        version: status.version.name,
        protocol: status.version.protocol,
        gamemode: status.gamemode,
        latency: status.latency
      };
    } catch (bedrockError) {
      try {
        // If Bedrock fails, try Java edition
        const status = await mcUtil.status(host, { port });
        return {
          online: true,
          host,
          port,
          motd: status.motd,
          players: {
            online: status.players.online,
            max: status.players.max
          },
          version: status.version.name,
          protocol: status.version.protocol,
          latency: status.latency
        };
      } catch (javaError) {
        // Both failed, return offline status
        return {
          online: false,
          host,
          port,
          error: bedrockError.message || javaError.message
        };
      }
    }
  }

  /**
   * Get formatted server status string
   * @param {Object} status - Server status object
   * @returns {string} Formatted status string
   */
  static formatStatus(status) {
    if (!status.online) {
      return `🔴 Server is offline: ${status.error}`;
    }

    return `🟢 ${status.motd}\nPlayers: ${status.players.online}/${status.players.max}\nVersion: ${status.version}\nLatency: ${status.latency}ms`;
  }
}

module.exports = MCStatus;