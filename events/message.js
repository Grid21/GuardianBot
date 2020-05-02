
const { PREFIX } = require('../config.json');

module.exports = {
    name: 'message',
    run: async (client, message) => {
        const data = await client.Guild.get(message.guild.id, 'prefix');
        if (data) client.prefix = data;
        if (!client.prefix) return;
        if (!message.content.startsWith(client.prefix) || message.author.bot) return;
        const args = message.content.slice(client.prefix.length).split(/ +/g);
        const command = args.shift().toLowerCase();
        if (!command) return;

        try {
            await command.run(message, args);
        } catch (err) {
            console.error(err);
            message.channel.send('There was an error while trying to run that command.');
        }
    }
};