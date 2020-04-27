const announceRole = "245272223101747200";
const currentlyLive = []; //array of live user ids
const fetch = require("node-fetch");
require('dotenv').config({
    path: "./.env"
})
let gameid;

module.exports = {
    async stream(client) { // the id has to be from twitch, not discord
        const server = await client.guilds.cache.get("108417593513127936");
        //Line 13 is the channel for affiliated streamers.
        const channel = client.channels.cache.get("464335012595105792");
        /** Importing Modules */
        
        server.members.cache.forEach(async m => {
            if (m.roles.cache.some(r => r.id == announceRole)) {
                if (!m.presence.activities) return;
                const activity = m.presence.activities.filter(m => m.type === "STREAMING")[0];
                if (!activity) return;
                
                var discordProfilePicture = m.user.avatarURL();
                await channel.send({embed:{
                    color: 0x6441a5,
                    title: `${m.displayName} just went live on twitch!`,
                    url: activity.url,
                    description: activity.details,
                    thumbnail: {
                        url: discordProfilePicture
                        }
                    }
                });
            }
        })
    },
    async twtich_fetch(url, method) {
        if (!method) method = "GET"
        return fetch(url, {
            method: method, 
            headers: {
                "Authorization": "Bearer " + process.env.TWITCH_SECRET,
                "Client-ID": process.env.TWITCH_ID 
            } 
        })
    },
    async twitch(username) {
        twitch_fetch("https://api.twitch.tv/helix/streams?user_login=" + username, "GET").then(res => res.json()).then(body => {
        const { data } = body;
        if (!data) return;
        else {
            const { user_name, title, game_id } = data;
            gameid = game_id
            const game_name = get_game_name(game_id);
            //its game id only, then you need to check steam api to get the game name
            // we only need name, title, and game
            //yes
        }
        }) // i figured it out
    },
    async loop() {
    },
    async get_game_name(id) { // fetch returns the data right? if we can do that then it return an object
        return await JSON.parse(twitch_fetch("https://api.twitch.tv/helix/games?id=" + game_id)).data[0].name;
    }
    //ok i can make pull request
    //ok cya
    /* github.com/grid21/guardianbot i think its public speaking of github, you should give me perms on it
     * @returns game name
    */
    
};

