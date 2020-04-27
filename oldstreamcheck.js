module.exports = {
    //just name is streamcheck.js
    //this is oldstreamcheck.js
    check: async function(member) {
        /*
        returns null if member is not streamer
        returns the discord activity of the stream if they are
        */
        // this is bad dont do this
        var userData = JSON.parse(JSON.stringify(member.presence));
        
        for (var act in userData["activities"]) {
            if (userData["activities"][act]["type"] == 1) {
                return userData["activities"][act];
            }
        }

        return null
    },
    check2: async function(client) {
        var server = await client.guilds.cache.get("108417593513127936");
        var announceRole = "245272223101747200";
        var channel = await client.channels.cache.get("458156246521085953");
        
        for (let m of server.members) {
            if (m.id == server.owner.id) {
                let status = this.check(m)

                if (status) {
                    console.log("grid is live")
                }
            } else if (m.roles.some(r=>r.id == announceRole)) {
                let status = this.check(m)

                if (status) {
                    console.log(m.displayName + " is live")
                }
            }
        }
    }
};

//console.log(server.members)

        /*
        
        
        liveMsg = await gridchannel.send({embed:{
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
        
        
        
        
        for (let m of server.members) {
            console.log(m.displayName)//brb
        }
        
        for (var m in server.members) {
            
            
            //var m2 = JSON.parse(JSON.stringify(server.members[m].presence));
            
            if (server.members[m].roles.some(r=>r==announceRole)) {
                //console.log(m.displayName)
                try {
                    if (!data[server.members[m].id]) {
                        data[server.members[m].id] = {isLive: false, liveMsg: null};
                    }
                    var live = false;
                    // this is bad dont do this
                    var userData = JSON.parse(JSON.stringify(server.members[m].presence));
                    
                    var twitchIndex = null;
                    for (var act in userData["activities"]) {
                        if (userData["activities"][act]["type"] == 1) {
                            live = true;
                            //console.log('is live') 
                            twitchIndex = act;
                            break;
                        }
                    }

                    if (live) {
                        if (!data[server.members[m].id].isLive) {
                            var discordProfilePicture = m.user.avatarURL;
                            //var msg = "**" + m.displayName + " is now live on twitch at " + userData["activities"][twitchIndex]["url"]
                            //console.log("is live")
                            //data[m.id].liveMsg = channel.send(msg);
                            
                            data[server.members[m].id].liveMsg = await channel.send({embed:{
                                color: 0x6441a5,
                                title: server.members[m].displayName + " just went live on twitch!",
                                url: userData["activities"][twitchIndex]["url"],
                                description: userData["activities"][twitchIndex]["details"],
                                thumbnail: {
                                    url: discordProfilePicture
                                }
                            }});
                        }
                        data[server.members[m].id].isLive = true;
                    } else {
                        if (data[server.members[m].id].isLive) {
                            data[server.members[m].id].liveMsg.delete();
                        }
                        data[server.members[m].id].isLive = false;
                    }
                } catch(err) {
                    console.log("Error while handling stream check for user " + server.members[m].displayName + ". Error Details: " + err);
                }
            }
        }*/