const log = require('../functions/logger');

module.exports = (bot) => {
  log(`Logged in as ${bot.user.tag} in ${bot.guilds.size} servers with ${bot.channels.size} visible channels.`);
};
