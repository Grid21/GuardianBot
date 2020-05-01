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
                const game_name = this.get_game_name(game_id);
                return {
                    user: user_name,
                    stream_title: title,
                    game: game_name
                }
            }
        }).catch(err => {
            //catching err
            if (err) console.log(err);
            //so bot do not stop working. And we catch the error
        })
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
                    let streaming = this.twitch(ud.twitch);
                    if (streaming !== null) {
                        if (!liveData[m.id].islive) {
                            var discordProfilePicture = m.user.avatarURL();
                            if (m.id == gridServer.owner.id) {
                                //TODO: replace streamerAnnounceChannel with twitch-announcements and affiliated-streamers
                                await streamerAnnounceChannel.send({content: "<@&705490467063726090>", embed:{
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
                                }});
                            } else {
                                await streamerAnnounceChannel.send({embed:{
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
                                }});
                            }
                            
                        }
                        liveData[m.id].islive = true;
                    } else {
                        if (liveData[m.id].islive) {
                            // delete live message
                        }
                        liveData[m.id].islive = false;
                    }
                }
                //console.log(ud)
            }
        });
        fs.writeFileSync("./livedata.json", liveData);
    },
};