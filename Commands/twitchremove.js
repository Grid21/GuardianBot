
const { Message } = require("discord.js")
const fs = require("fs");
module.exports = {
    name: 'twitchremove', // name of the command
    description: 'Twitch Remove', // description of the command
    /**
     * 
     * @param {Message} param0
     * @param {Array} param1 
     */
    async run({client, content, guild, channel, member, mentions}, [cont, ...args]) {
            if (cont.match(/(http)\w:\/\/+www.twitch.tv\//g)) {
        let url = cont.slice(22).replace("/", "")
        let newurls = await client.Guild.get('urls');
        if (!newurls.includes(url)) return channel.send(`The user has not been added to the list`);
         url = newurls.splice( newurls.indexOf(url), 1 );
        await client.Guild.set('urls', newurls);
        channel.send("Successfully removed " + url);
        } else return channel.send("Please provide a valid Twitch link.");

    }
}
