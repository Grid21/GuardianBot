const announceRole = "245272223101747200";
var streamerAnnounceChannel = null;
var gridServer = null;
const fetch = require("node-fetch");
require('dotenv').config({path: "./.env"})
var liveData = {
}

module.exports = {
    async init(client) {
        streamerAnnounceChannel = client.channels.cache.get("464335012595105792");
        gridServer = client.guilds.cache.get("108417593513127936");
    },
    async twitch_fetch(url, method) {
        if (!method) method = "GET"
        return fetch(url, {
            method: method, 
            headers: {
                "Authorization": "Bearer " + process.env.TWITCH_SECRET,
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
                //const game_name = this.get_game_name(game_id);
                return {
                    user: user_name,
                    stream_title: title,
                    //game: game_name
                }
            }
        });
    },
    async loop() {
        gridServer.members.cache.forEach(async m => {
            if (m.id == gridServer.owner.id || m.roles.cache.some(r => r.id == announceRole)) {
                if (!liveData[m.id]) {
                    liveData[m.id] = {twitch: undefined, islive: false}
                }
                let ud = liveData[m.id];
                
                if (!ud.twitch) {
                    let activity = m.presence.activities.filter(m => m.type === "STREAMING")[0];
                    if (activity) {
                        ud.twitch = activity.url.split(".tv/", 2)[1]
                        
                    }
                }
                
                if (ud.twitch) {
                    let streaming = this.twitch(ud.twitch);
                    if (streaming != null) {
                        if (!ud.islive) {
                            var discordProfilePicture = m.user.avatarURL();
                            await streamerAnnounceChannel.send({embed:{
                                color: 0x6441a5,
                                title: `${m.displayName} just went live on twitch!`,
                                url: "https://twitch.tv/" + ud.twitch,
                                description: streaming.title,
                                thumbnail: {
                                    url: discordProfilePicture
                                }
                                }
                            });
                        }
                        ud.islive = true;
                    } else {
                        if (ud.islive) {
                            // delete live message
                        }
                        ud.islive = false;
                    }
                }
                //console.log(ud)
            }
        });
    },
};