const { RichEmbed } = require('discord.js');

module.exports = {
  commands: [
    'help',
    'helpme'
  ],
  usage: 'help [command]',
  description: 'View a list of commands or get information about a specific command.',
  category: 'Information',
  execute: (bot, msg, args) => {
    if (args.length > 0) {
      const command = Object.keys(bot.commands).filter((c) => bot.commands[c].commands.indexOf(args[0]) > -1);
      if (command.length > 0) {
        const embed = new RichEmbed()
        .setAuthor('Command Information', '')
        .setColor(0x5B8DEA)
        .addField('Name', bot.commands[command[0]].commands[0])
        .addField('Description', bot.commands[command[0]].description)
        .addField('Aliases', bot.commands[command[0]].commands.length > 1 ? bot.commands[command[0]].commands.slice(1).join(', ') : 'No Aliases')
        .setFooter('https://github.com/LarK1n/mercy-selfbot')
        .setTimestamp();
        msg.edit({ embed });
      } else {
        const embed = new RichEmbed()
        .setAuthor('Command List')
        .setColor(0x5B8DEA)
        .setDescription('That is not a command that I know of.')
        .setFooter('https://github.com/LarK1n/mercy-selfbot')
        .setTimestamp();
        msg.edit({ embed });
      }
    } else {
      let helplist = {};
      Object.keys(bot.commands).forEach((command) => {
        if (bot.commands[command].category in helplist) {
          helplist[bot.commands[command].category] += '\n' + bot.commands[command].commands[0] + ' - ' + bot.commands[command].description;
        } else {
          helplist[bot.commands[command].category] = bot.commands[command].commands[0] + ' - ' + bot.commands[command].description;
        }
      });
      const embed2 = new RichEmbed()
      .setAuthor('Command List')
      .setColor(0x5B8DEA)
      .setDescription(Object.keys(helplist).map((command) => '__' + command + '__\n' + helplist[command]).join('\n\n'))
      .setFooter('https://github.com/LarK1n/mercy-selfbot')
      .setTimestamp();
      msg.edit({ embed: embed2 });
    }
  }
};
