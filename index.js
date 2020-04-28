const PREFIX = '!';
// const clear = require('./Commands/clear.js');
// Ping is an example of how to use module.exports
var ping = require("./Commands/ping.js");
// Links file contains social links and all links. Easy Editable file.
var links = require('./Commands/links.js');
var clear = require("./Commands/clear.js");
var stream_check = require("./streamcheck.js");
var messages = require('./JSONFiles/messages.json');
const {Client, MessageEmbed} = require('discord.js');
require('dotenv').config();
const bot = new Client({ fetchAllMembers: true });
/** Fetching all members, so that we can use them later */
var version = 'v0.5.4';
var data = {};

var profanities = require('profanities')
const token = process.env.BOT_TOKEN;
bot.on('ready', async () => {
    stream_check.init(bot);
    // stream(bot);
    //twitch();
    console.log('GuardianBot has joined GOTG Discord!');
    // Lines 20 through 22 is console logging.
    bot.on("error", e => console.error);
    bot.on("warn", e => console.warn);
    bot.on("debug", e => console.info);

    // initialize the stream check loop
    setInterval(async function() {
        try {
            data = await stream_check.loop();
        } catch (err) {
            console.log(err)
        }
        
    }, 1e4) //3e5 is 5 mins
})

//var staffRoles = ["463937121141522432", "160221051983233024"]
bot.on('message', async (msg) =>{
    if (!msg.author.bot) {
        try {
            if (msg.content.startsWith(PREFIX)) {
                let args = msg.content.substring(PREFIX.length).split(" ");

                if (msg.member.guild.owner.id == msg.member.id || msg.member.roles.cache.has("463937121141522432") || msg.member.roles.cache.has("160221051983233024") || msg.member.roles.cache.has("593667878063046666")) {
                    var isStaff = true;
                }
        
                if (args[0] == "ping") {
                    ping.ping(msg);
                } else if (args[0] == "invite") {
                    links.invite(msg);
                }  else if (args[0] == "website") {
                    links.website(msg);
                } else if (args[0] == "social") {
                    links.social(msg);
                } else if (args[0] == "clear") {
                    if (isStaff) {
                        await clear.clear(msg, args);
                    } else {
                        msg.reply("You do not have permission").then(msg => msg.delete(5000));
                    }
                    
                } else if (args[0] == "botinfo") {
                    /*if(msg.member.roles.find(r => r.name === "Community Manager") || msg.member.roles.find(r => r.name === "Discord Mods") || msg.member.roles.find(r => r.name === "Owner")) {
                        Leave this code in the event we want to do something custom later down the road.
                    */
                    if (isStaff) {
                        msg.channel.send({
                            "embed": {
                                "title": "GuardianBot (" + version + ")",
                                "description": "Thank you to everyone that has contributed to the creation of GuardianBot!",
                                "color": 0x0000ff,
                                
                                "fields": [
                                    {
                                        "name": "Authors of GuardianBot",
                                        "value": "Grid21, \nVergilPrime, \nSundafyllir"
                                    },
                                    {
                                        "name": "Additonal help",
                                        "value": "Leotomas, Yoshidog2005, MarriedGeekGuy, Johna3212"
                                    }
                                ]
                            }
                        });
                    } else {
                        msg.channel.send('You do not have permission');
                    }
                } else if (args[0] == "streamtest") {
                    
                }
            } else {
            }
        }
        catch(err){
            msg.reply("Error: " + err.message);
        }
        // This section refers to calling up the .json files that have quotes, replies, and info.
        if(msg.mentions.users.has(bot.user)) {
            
            var msgMatch = BotReplies.find(m => msg.content.toLowerCase().includes(m.msg.toLowerCase()));
            if(typeof msgMatch !== 'undefined') {
                msg.reply(msgMatch.reply);
            }
        }

        var msgMatch = messages.find(m => m.msg.toLowerCase() === msg.content.toLowerCase());
        if(typeof msgMatch !== 'undefined') {
            msg.reply(msgMatch.reply);
        }
        // This is the swear word filtering section
        for (p in profanities){
            if (msg.content.toLowerCase() == profanities[p].toLowerCase() || msg.content.toUpperCase() == profanities[p].toUpperCase()){
                msg.channel.send('You can\'t say that. Please don\'t break the rules.');
                msg.delete();
        }
    }
}});

// This section is for creating debug information. Need to sort command logging,
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

bot.login(token);
console.log("login into Discord.");