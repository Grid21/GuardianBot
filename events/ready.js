const fet = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
    name: 'ready',
    run: async client => {
        return console.log(`Logged in as ${client.user.tag}!`);
        const usernames = await client.Guild.get("url");
        setInterval(() =>{
            usernames.forEach(username => {
            twitch_data(client, username);
            })

        }, 30000)
    }
};
async function twitch_fetch(url) {

    var res = await (await fet(url, {
        method: "GET",
        headers: {
            "Authorization": "OAuth " + process.env.TEST_OAUTH,
            "Client-ID": process.env.TEST_ID
        }
    })).json()
    return res;
}
async function game_name(game_id) {
    let abc = await twitch_fetch("https://api.twitch.tv/helix/games?id=" + game_id);
    let game_name = abc.data[0].name;
    return game_name;
}
async function twitch_data(client, username) {
    const info = await twitch_fetch("https://api.twitch.tv/helix/streams?user_login=" + username);
    if (!info.data[0]) return;
    const { user_name, title, viewer_count, thumbnail_url, game_id } = info.data[0];
    const gameName = await game_name(game_id);
    client.channels.cache.get("464335012595105792").send({
        embed: {
            color: 0x6441a5,
            title: `${user_name} just went live on twitch!`,
            url: "https://twitch.tv/" + user_name,
            image: {
                url: thumbnail_url.replace("{width}x{height}", "1280x720")
            },
            fields: [
                {
                    name: "Title",
                    value: title,
                    inline: true
                },
                {
                    name: "Game",
                    value: gameName, //ok now test
                    inline: true
                },
                {
                    name: "Viewer Count",
                    value: viewer_count,
                }
            ]
        }
    })

}
