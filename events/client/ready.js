const stream_check = require("../streamcheck");

module.exports = bot => {
    //const staffRoles = ["463937121141522432", "160221051983233024"]
    // stream(bot);
    //twitch();
stream_check.init(bot);
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
});
}