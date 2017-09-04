const config = require('../config.json');

module.exports = (bot, msg) => {
  if(msg.author.id !== bot.user.id) {
    return;
  }
  if(!msg.content.startsWith(config.discord.prefix)) {
    return;
  }

  const command = Object.keys(bot.commands).filter((command) => bot.commands[command].commands.indexOf(msg.content.replace(config.discord.prefix, '').split(' ')[0]) > -1);
  if (command.length > 0) {
    const args = msg.content.replace(config.discord.prefix, '').split(' ').length > 1 ? msg.content.replace(config.discord.prefix, '').split(' ').slice(1) : [];
    try {
      bot.commands[command[0]].execute(bot, msg, args);
    } catch (error) {
      let toSend = 'An error has occured running that command.```js\n' + error.message + '```';
      if(toSend.length > 1900) {
        msg.edit('An error has occured running that command and the output has been logged to console.');
        throw new Error(error);
      } else {
        msg.edit(toSend);
        throw new Error(error);
      }
    }
  }
};
