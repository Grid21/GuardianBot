const { Message } = require("discord.js")
module.exports = {
    name: 'website', // name of the command
    description: 'Link for the website', // description of the command
    /**
     * 
     * @param {Message} message 
     * @param {Array} args 
     */
    async run(msg, args) {
        msg.channel.send('https://grid21.weebly.com/');
    }
}