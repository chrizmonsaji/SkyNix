const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embed = require('../../lib/embed.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluates JavaScript code (Admin only)')
    .addStringOption(option => 
      option.setName('code')
        .setDescription('JavaScript code to evaluate')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction, client) {
    const code = interaction.options.getString('code');
    
    try {
      // Evaluate the code
      let evaled = eval(code);
      
      // Resolve if it's a promise
      if (evaled instanceof Promise) {
        evaled = await evaled;
      }
      
      // Convert to string and truncate if too long
      let result = require('util').inspect(evaled, { depth: 0 });
      
      if (result.length > 1000) {
        result = result.substring(0, 1000) + '... (truncated)';
      }
      
      const successEmbed = Embed.success(
        'Code Evaluated Successfully',
        `\`\`\`js\n${result}\`\`\``
      );
      
      await interaction.reply({ embeds: [successEmbed], ephemeral: true });
    } catch (error) {
      const errorEmbed = Embed.error(
        'Evaluation Error',
        `\`\`\`js\n${error}\`\`\``
      );
      
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};