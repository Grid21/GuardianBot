const version = "v0.6.0" //version
const { Message, MessageEmbed } = require("discord.js")
module.exports = {
    name: 'botinfo', // name of the command
    description: 'info of the bot', // description of the command
    /**
     * 
     * @param {Message} msg 
     * @param {Array} args 
     */
    async run(msg, args) {
       if (msg.member.roles.cache.has("160221051983233024") || msg.member.roles.cache.has("593667878063046666")) { //wait wait
       //doesn't support an array in v12
        msg.channel.send(
           new MessageEmbed()
           .setTitle("GuardianBot (" + version + ")")
           .setDescription("Thank you to everyone that has contributed to the creation of GuardianBot!") //its v12 thatswhy
            .setColor(0x0000ff)
            .addFields([
                {
                    name: "Authors of GuardianBot",
                    value: "Grid21, \nVergilPrime, \nSundafyllir"
                },
                {
                    name: "Additonal help",
                    value: "Leotomas, Yoshidog2005, MarriedGeekGuy, Johna3212"
                }
            ])
            .setFooter(`Created with love | Guardian`)
           );

       } else return msg.channel.send("Permissions denied")
    }
}