const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../lib/embed.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask the AI a question')
    .addStringOption(option => 
      option.setName('prompt')
        .setDescription('Your question for the AI')
        .setRequired(true)
    ),
  
  async execute(interaction, client) {
    const prompt = interaction.options.getString('prompt');
    
    // Check if AI key is configured
    if (!process.env.AI_KEY) {
      const errorEmbed = Embed.error(
        'AI Service Not Configured',
        'The AI service is not properly configured. Please contact an administrator.'
      );
      
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
    
    await interaction.deferReply();
    
    try {
      // For now, we'll simulate an AI response since we don't have a real API key
      // In a real implementation, you would call an AI API like OpenAI
      const simulatedResponses = [
        `I understand you're asking about "${prompt}". As an AI assistant, I can help with various topics related to Minecraft and the Sky Realm S2 server.`,
        `Regarding your question "${prompt}", that's an interesting topic. For Minecraft-related questions, I recommend checking the server rules and guidelines.`,
        `Thanks for asking: "${prompt}". As an AI, I'm here to help with information about Sky Realm S2 and general Minecraft tips.`,
        `I've processed your query about "${prompt}". For more specific Minecraft server information, please check our channels or ask a staff member.`
      ];
      
      const response = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
      
      const aiEmbed = Embed.custom(
        '🤖 AI Response',
        response,
        '#8A2BE2' // Purple theme
      )
      .addFields(
        { name: 'Your Question', value: prompt, inline: false }
      );
      
      await interaction.editReply({ embeds: [aiEmbed] });
      
      // In a real implementation, you would use something like this:
      /*
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.AI_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      const aiResponse = response.data.choices[0].message.content;
      
      const aiEmbed = Embed.custom(
        '🤖 AI Response',
        aiResponse,
        '#8A2BE2' // Purple theme
      )
      .addFields(
        { name: 'Your Question', value: prompt, inline: false }
      );
      
      await interaction.editReply({ embeds: [aiEmbed] });
      */
    } catch (error) {
      console.error('AI command error:', error);
      
      const errorEmbed = Embed.error(
        'AI Service Error',
        'An error occurred while processing your request. Please try again later.'
      );
      
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};