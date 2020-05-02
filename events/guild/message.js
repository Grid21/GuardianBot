const prefix = "!"

module.exports = async (bot, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    //returning if there is no prefix
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    //checking if commandfile exists

    if(commandfile) commandfile.run(bot, message, args)
    //if exists, run it
}