const PREFIX = "!"
const { Client, Message } = requrie("discord.js"); 
const replies = require("../JSONFiles/messages.json");
const profanities = require("profanities");
module.exports = {
    name: 'message',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run: async (client, message) => {
        for (p in profanities) {
            if (message.content.toLowerCase() == profanities[p].toLowerCase() || message.content.toUpperCase() == profanities[p].toUpperCase()){
                message.channel.send('You can\'t say that. Please don\'t break the rules.');
                message.delete();
        }
    };




        const data = await client.Guild.get(message.guild.id, 'prefix');
        if (data) client.prefix = data;
        if (message.author.bot) return;
        if (!message.content.startsWith(client.prefix)) {
            const message = replies.find(m => m.message.toLowerCase() === message.content.toLowerCase)
            if (message) {
                message.channel.send(message.reply);
            };
        }
        const [commandName, ...args] = message.content.slice(client.prefix.length).split(/\s+/);
        const command = client.commands.get(commandName.toLowerCase());
        if (!command) return;

        try {
            await command.run(message, args);
        } catch (err) {
            console.error(err);
            message.channel.send('There was an error while trying to run that command.');
        }
    }
};