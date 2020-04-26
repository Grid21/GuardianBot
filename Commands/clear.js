module.exports = {
    clear: async function(m, args) {
        if(args.length < 2 ){ 
            m.reply('Error, Please define second arg');
        } else {
            var amnt = parseInt(args[1])
            if (isNaN(amnt)) {
                m.channel.send("You must type a number!")
            } else if (amnt >= 0 && amnt < 100) {
                let msgs = await m.channel.bulkDelete(amnt+1,true)
                m.channel.send('Deleted ' + msgs.size + " messages. This message will self destruct.").then(msg => msg.delete({"timeout":3000}))
                
            } else {
                m.channel.send('Cannot delete ' + args[1] + " messages. This message will self destruct.")
                    .then(msg => msg.delete({"timeout":3000}));
            }
            //msg.reply('second arg taken');
            //await deleteMessages(msg.channel, parseInt(args[1]) + 1);
            
        }
    }
}