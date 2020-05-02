const prefix = "!"
const {Client, MessageEmbed} = require('discord.js');
require('dotenv').config();
const bot = new Client({ fetchAllMembers: true });
const version = "v0.5.4"

bot.login(process.env.TOKEN);
bot.events = new Collection();
bot.prefix = PREFIX;
const COMMAND_DIR = "./Commands";
const EVENT_DIR = "./events"
// Database
bot.Guild = new Endb({
  uri: `sqlite://guild`,
  table: 'guild'
});

// Command Handler
const commandFiles = readdirSync(COMMAND_DIR).filter(file =>
  file.endsWith('.js')
); //splitting file name
for (const file of commandFiles) {
  const command = require(`${COMMAND_DIR}/${file}`);
  bot.commands.set(command.name, command); //setting up the commands
}

// Event Handler
const eventFiles = readdirSync(EVENT_DIR).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`${EVENT_DIR}/${file}`);
  bot.on(
    event.name ? event.name : file.split('.')[0],
    event.run.bind(null, bot)
  );
  delete require.cache[require.resolve(`${EVENT_DIR}/${file}`)];
}

process.on('uncaughtException', error => console.error(error));
process.on('unhandledRejection', reason => console.log(reason));
