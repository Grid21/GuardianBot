module.exports = {
    clear: async function(m, args) {
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