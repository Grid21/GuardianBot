
const { Message } = require("discord.js")
module.exports = {
    name: 'ping', // name of the command
    description: 'pong', // description of the command
    /**
     * 
     * @param {Message} message 
     * @param {Array} args 
     */
    async run(msg, args) {
        msg.channel.send('pong')
    }
}