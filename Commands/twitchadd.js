
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
         await client.Guild.push('url', `${url.replace("/", "")}`);
        channel.send("Successfully added " + url);
        } else return channel.send("Please provide a valid Twitch link.");
//      fs.writeFile("./JSONFiles/twitch.json", JSON.stringify(array), err => {
//          if (err) {
//              console.error(err)
//              return channel.send("done")
//          }
//      })

 
   }
  }
        //we are adding url name only so its not a headache
    
