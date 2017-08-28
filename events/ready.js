const log = require('../functions/logger')

module.exports = (bot) => {
  log(`Ready in ${bot.guilds.size} servers with ${bot.channels.size} visible channels.`);
}
