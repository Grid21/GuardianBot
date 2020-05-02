
const { Message } = require("discord.js")
module.exports = {
    name: 'discord', // name of the command
    description: 'Invite link for the discord', // description of the command
    /**
     * 
     * @param {Message} message 
     * @param {Array} args 
     */
    async run(msg, args) {
        msg.channel.send('https://discord.gg/RPSSGWx');
    }
}