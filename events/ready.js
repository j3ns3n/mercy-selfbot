const log = require('../functions/logger')

module.exports = (bot) => {
  log(`Logged in as ${bot.user.tag} and ready in ${bot.guilds.size} servers with ${bot.channels.size} visible channels.`);
}
