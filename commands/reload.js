const Discord = require('discord.js');
const config = require('../config.json');
const util = require('util');

module.exports = {
  commands: [
    'reload'
  ],
  usage: 'reload <command>',
  description: 'Reloads a command from inside the bot.',
  category: 'Utility',
  execute: (bot, msg, args) => {
    if (args.length > 0) {
      const filtered = Object.keys(bot.commands).filter((c) => args[0] === c || bot.commands[c].commands.indexOf(args[0]) > -1);
      if (filtered.length > 0) {
        const old = Object.create(bot.commands[filtered[0]]);
        delete bot.commands[filtered[0]];
        delete require.cache[require.resolve('./' + filtered[0] + '.js')];
        try {
          bot.commands[filtered[0]] = require('./' + filtered[0] + '.js');
          msg.edit('**Successfully reloaded command `' + bot.commands[filtered[0]].commands[0] + '`.**');
        } catch(e) {
          msg.edit('**An error occured while assigning command to self. Restoring in-memory command to before reload.**\n```js\n' + util.inspect(e) + '```');
          delete bot.commands[filtered[0]];
          bot.commands[filtered[0]] = old;
        }
      } else {
        msg.edit('**That is not a command that I know of.**');
      }
    } else {
      msg.edit('**Missing command to reload.**');
    }
  }
};
