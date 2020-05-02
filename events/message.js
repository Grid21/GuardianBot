const PREFIX = "!"

const { Client, Message } = require("discord.js"); 

const replies = require("../JSONFiles/messages.json");
const profanities = require("profanities");

module.exports = {
    name: 'message',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run: async (client, message) => {

        for (let p in profanities) {
            if (message.content.toLowerCase() === profanities[p].toLowerCase()) {
                message.delete();
                (await message.channel.send('You can\'t say that. Please don\'t break the rules.')).delete({"timeout": 3000});
            }
        };
        if (message.author.bot) return;
        if (!message.content.startsWith(client.prefix)) {
            // if (!message.mentions.members.first()) return;
            // if (message.mentions.members.first().id !== "591744135522680843") return;
            const reply = replies.find(m => m.msg.toLowerCase() === message.content.toLowerCase());
            if (reply) {
                console.log(reply)
                message.channel.send(reply.reply)
            } else console.log("not found")
        } else {
            const data = await client.Guild.get(message.guild.id, 'prefix');
            if (data) client.prefix = data;
            if (!client.prefix) return;
            //mention string of bot
            if (!message.content.startsWith(client.prefix) || message.author.bot) return;
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
    }
};