const PREFIX = "!"
const { readdirSync } = require("fs") //save 
//default prefix
const Endb = require("endb"); //module `npm i endb`
//omg i forgot to import liabries
const {Client, MessageEmbed, Collection} = require('discord.js');
require('dotenv').config({
  path: "./.env"
});
//this path is for env file
const bot = new Client({ fetchAllMembers: true });
//version of the bot
bot.login(process.env.BOT_TOKEN); //logging in using toke
bot.events = new Collection(); //all events we have code
bot.commands = new Collection();
bot.prefix = PREFIX; //prefix
const COMMAND_DIR = "./Commands"; // commands directory
const EVENT_DIR = "./events" //events directory
// Database
bot.Guild = new Endb({
  uri: `sqlite://guild`,
  table: 'guild'
});
// This is advanced, we have integerated sqlite database (you don't need anything to run)
//we will save prefix in database and all other things which are necessary
//using json is not safe
//json got corrupted if you do more than 5 changes in 1 minute.


// Command Handler
const commandFiles = readdirSync(COMMAND_DIR).filter(file => //checking files existing in command directory (./commands)
  file.endsWith('.js') //checking if file ends with js only
); 
for (const file of commandFiles) {
  const command = require(`${COMMAND_DIR}/${file}`); //getting the path (./commands/clear)
  bot.commands.set(command.name, command); //ok i need to put commands in that template 
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
