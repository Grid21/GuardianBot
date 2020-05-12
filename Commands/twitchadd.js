
const { Message } = require("discord.js")
const fs = require("fs");
module.exports = {
    name: 'twitchadd', // name of the command
    description: 'Twitch add', // description of the command
    /**
     * 
     * @param {Message} param0
     * @param {Array} param1 
     */
    async run({client, content, guild, channel, member, mentions}, [cont, ...args]) {
    let array;
        if (cont.match(/(http)\w:\/\/+www.twitch.tv\//g)) {
        const url = cont.slice(22).replace("/", "")
        let newurls = await client.Guild.get('urls') || [];
       await newurls.push(url);
        const m = await client.Guild.set('urls', newurls)
        channel.send("Successfully added " + url);
        console.log(m)

        } else return channel.send("Please provide a valid Twitch link.");

}
}

