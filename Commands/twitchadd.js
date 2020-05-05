
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

//  fs.readFile("./JSONFiles/twitch.json", {encoding: "utf8"}, (err, data) => {
//     array = data.toString().split(",");
//     console.log(array)
// });
// if (cont.match("https://")) {
//     const url = cont.slice(22);
//     if (array.includes(url)) {
//         return channel.send("Already added")
//     } else {
//      array.push(url);

//      fs.writeFile("./JSONFiles/twitch.json", JSON.stringify(array), err => {
//          if (err) {
//              console.error(err)
//              return channel.send("done")
//          }
//      })

 
   }
  }
        //we are adding url name only so its not a headache
    }
}