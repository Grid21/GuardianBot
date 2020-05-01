const announceRole = "245272223101747200";
var streamerAnnounceChannel = null;
var gridServer = null;
const fetch = require("node-fetch");
const fs = require("fs");
require('dotenv').config({path: "./.env"})
var liveData = {}

module.exports = {
    async init(client) {
        streamerAnnounceChannel = client.channels.cache.get("464335012595105792");
        ownerAnnounceChannel = client.channels.cache.get("464335012595105792");
        gridServer = client.guilds.cache.get("108417593513127936");
        try {
            liveData = JSON.parse(fs.readFileSync("./livedata.json"))
        } catch (err) {
            liveData = {}
        }
    },
    async twitch_fetch(url, method) {
        if (!method) method = "GET"
        return fetch(url, {
            method: method, 
            headers: {
                "Authorization": `Bearer ${process.env.TWITCH_SECRET}`,
                "Client-ID": process.env.TWITCH_ID 
            } 
        })
    },
    async get_game_name(id) {
        return await JSON.parse(this.twitch_fetch("https://api.twitch.tv/helix/games?id=" + id)).data[0].name;
    },
    async twitch(username) { // if user is streaming, returns stream data, otherwise, returns null
        this.twitch_fetch("https://api.twitch.tv/helix/streams?user_login=" + username, "GET").then(res => res.json()).then(body => {
            const { data } = body;
            if (!data) return null;
            else {
                const { user_name, title, game_id } = data;
                const game_name = await this.get_game_name(game_id);
                return {
                    user: user_name,
                    title: title,
                    game: game_name
                }
            }
        }).catch(err => {
            //catching err
            if (err) console.log(err);
            //so bot do not stop working. And we catch the error
        })
    },
    async twitchLinkCommand(message) {
        if (message.member.id == gridServer.owner.id || message.member.roles.cache.some(r => r.id == announceRole)) {
            var args = message.content.split(" ");
            if (args.length >= 2) {
                let oldName = liveData[message.member.id].twitch
                liveData[message.member.id].twitch = args[1];
                message.reply("Succesfully changed remembered twitch username from " + oldName + " to " + liveData[message.member.id].twitch + "!")
            }
        } else {
            message.reply("You do not have permission to do this!")
        }
    },
    async loop() {
        gridServer.members.cache.forEach(async m => {
            if (m.id == gridServer.owner.id || m.roles.cache.some(r => r.id == announceRole)) {
                if (!liveData[m.id]) {
                    liveData[m.id] = {twitch: undefined, islive: false, liveMsgID: null}
                }
                
                if (!liveData[m.id].twitch) {
                    let activity = m.presence.activities.filter(m => m.type === "STREAMING")[0];
                    if (activity) {
                        liveData[m.id].twitch = activity.url.split(".tv/", 2)[1]
                        
                    }
                }
                
                if (liveData[m.id].twitch) {
                    let streaming = this.twitch(liveData[m.id].twitch);
                    if (streaming !== null) {
                        if (!liveData[m.id].islive) {
                            var discordProfilePicture = m.user.avatarURL();
                            if (m.id == gridServer.owner.id) {
                                //await ownerAnnounceChannel.send({content: "<@&705490467063726090>", embed:{
                                streamerAnnounceChannel.send({content: "<@&705490467063726090>", embed:{
                                    color: 0x6441a5,
                                    title: "Grid just went live on twitch!",
                                    url: "https://twitch.tv/grid21",
                                    description: userData["activities"][twitchIndex]["details"],
                                    thumbnail: {
                                        url: discordProfilePicture
                                    },
                                    image: {
                                        url: "https://cdn.discordapp.com/attachments/703416034803056680/703416283596849242/Grid_Black_1080.png"
                                    }
                                }}).then(sentMessage => liveData[m.id].liveMsgID = sentMessage.id).catch(console.log);
                            } else {
                                streamerAnnounceChannel.send({embed:{
                                    color: 0x6441a5,
                                    title: `${m.displayName} just went live on twitch!`,
                                    url: "https://twitch.tv/" + liveData[m.id].twitch,
                                    thumbnail: {
                                        url: discordProfilePicture
                                    },
                                    fields: [
                                        {
                                            name: "Title",
                                            value: streaming.title,
                                            inline: true
                                        },
                                        {
                                            name: "Game",
                                            value: streaming.game,
                                            inline: true
                                        }
                                    ]
                                }}).then(sentMessage => liveData[m.id].liveMsgID = sentMessage.id).catch(console.log);
                            }
                            
                        }
                        liveData[m.id].islive = true;
                    } else {
                        if (liveData[m.id].islive) {
                            if (m.id == gridServer.owner.id) {
                                //ownerAnnounceChannel.messages.delete(liveData[m.id].liveMsgID)
                                streamerAnnounceChannel.messages.delete(liveData[m.id].liveMsgID)
                            } else {
                                streamerAnnounceChannel.messages.delete(liveData[m.id].liveMsgID)
                            }
                        }
                        liveData[m.id].islive = false;
                    }
                }
            }
        });
        fs.writeFileSync("./livedata.json", JSON.stringify(liveData));
    },
};