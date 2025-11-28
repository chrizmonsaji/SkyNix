const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

// Create collections for commands and interactions
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

// Load commands from folders
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, folder, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded command: ${command.data.name}`);
    } else {
      console.log(`❌ Command file ${filePath} is missing required "data" or "execute" property.`);
    }
  }
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
  console.log(`✅ Loaded event: ${event.name}`);
}

// Load interactions (buttons, select menus, modals)
const loadInteractions = (dir, collection) => {
  const interactionPath = path.join(__dirname, dir);
  const interactionFolders = fs.readdirSync(interactionPath);
  
  for (const folder of interactionFolders) {
    const interactionFiles = fs.readdirSync(path.join(interactionPath, folder)).filter(file => file.endsWith('.js'));
    for (const file of interactionFiles) {
      const filePath = path.join(interactionPath, folder, file);
      const interaction = require(filePath);
      
      if ('data' in interaction && 'execute' in interaction) {
        collection.set(interaction.data.name || interaction.data.id, interaction);
        console.log(`✅ Loaded ${dir.split('/')[2]}: ${interaction.data.name || interaction.data.id}`);
      }
    }
  }
};

loadInteractions('interactions/buttons', client.buttons);
loadInteractions('interactions/selectMenus', client.selectMenus);
loadInteractions('interactions/modals', client.modals);

// Login to Discord
client.login(process.env.TOKEN);

module.exports = client;