const { Message } = require("discord.js")
module.exports = {
    name: 'social', // name of the command
    description: 'Link Tree site', // description of the command
    /**
     * 
     * @param {Message} message 
     * @param {Array} args 
     */
    async run(msg, args) {
        msg.channel.send('https://linktr.ee/grid21ttv');
        
    }
}