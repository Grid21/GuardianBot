
const { Message } = require("discord.js")
module.exports = {
    name: 'clear', // name of the command
    description: 'Purge messages', // description of the command
    /**
     * 
     * @param {Message} m
     * @param {Array} args 
     */
    async run(m, args) {
        //ok its correct just need !msg to check if member has not the perms
        if (!m.member.roles.cache.has("160221051983233024") || !m.member.roles.cache.has("593667878063046666")) return; //perms checking        
        if (args[0]) {
            var amnt = parseInt(args[0])
            if (isNaN(amnt)) {
                m.channel.send("You must type a number!")
                //wait, channel.bulkDelete() is removed deprecated
            } else if (amnt >= 0 && amnt < 100) {
                let msgs = await m.channel.bulkDelete(amnt+1);
                m.channel.send('Deleted ' + msgs.size + " messages. This message will self destruct.").then(msg => msg.delete({"timeout":3000})).catch(console.log)
                
            } else {
                m.channel.send('Cannot delete ' + args[0] + " messages. This message will self destruct.")
                    .then(msg => msg.delete({"timeout":3000})).catch(console.log);
            }
            
        }
    }
}