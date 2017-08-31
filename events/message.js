const config = require('../config.json');

module.exports = (bot, msg) => {
  if(msg.author.id !== bot.user.id) {
    return;
  }
  if(!msg.content.startsWith(config.discord.prefix)) {
    return;
  }

  const command = Object.keys(bot.commands).filter((c) => bot.commands[c].commands.indexOf(msg.content.replace(config.discord.prefix, '').split(' ')[0]) > -1);
  if (command.length > 0) {
    const args = ((msg.content.replace(config.discord.prefix, '').split(' ').length > 1) ? msg.content.replace(config.discord.prefix, '').split(' ').slice(1) : []);
    try {
      bot.commands[command[0]].execute(bot, msg, args);
    } catch (e) {
      let toSend = 'An error has occured running that command.```js\n' + e.message + '```';
      if(toSend.length > 1900) {
        msg.edit('An error has occured running that command and the output has been logged to console.');
        throw new Error(e);
      } else {
        msg.edit(toSend);
        throw new Error(e);
      }
    }
  }
};
