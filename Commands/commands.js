const { Message } = require("discord.js") //run old for now, we will fix and run new one
module.exports = {
    name: 'Twitchrole', // name of the command
    description: 'Details to get streamer role', // description of the command
    /**
     * 
     * @param {Message} message 
     * @param {Array} args 
     */
    async run(msg, args) {
        msg.channel.send('In order to get the Twitch Streamer Role. You must. 1. Stream 3 Times a week, and 2. Be a Twitch Affiliate.');
 
    }
}