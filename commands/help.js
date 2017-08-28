const { RichEmbed } = require('discord.js')

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
      const command = Object.keys(bot.commands).filter(c => bot.commands[c].commands.indexOf(args[0]) > -1);
      if (command.length > 0) {
        const embed = new RichEmbed()
        .setAuthor('Command Information', '')
        .setColor(0x5B8DEA)
        .addField('Name', bot.commands[command[0]].commands[0])
        .addField('Description', bot.commands[command[0]].description)
        .addField('Aliases', ((bot.commands[command[0]].commands.length > 1) ? bot.commands[command[0]].commands.slice(1).join(', ') : 'No Aliases'))
        .setDescription('Mercy Selfbot')
        .setTimestamp();
        msg.edit({ embed });
      } else {
        const embed = new RichEmbed()
        .setAuthor('Command List')
        .setColor(0x5B8DEA)
        .setDescription('That is not a command that I know of.')
        .setTimestamp();
        msg.edit({ embed });
      }
    } else {
      let helplist = {};
      Object.keys(bot.commands).forEach(c => {
        if (bot.commands[c].category in helplist) {
          helplist[bot.commands[c].category] += '\n' + bot.commands[c].commands[0] + ' - ' + bot.commands[c].description;
        } else {
          helplist[bot.commands[c].category] = bot.commands[c].commands[0] + ' - ' + bot.commands[c].description;
        }
      })
      const embed2 = new RichEmbed()
      .setAuthor('Command List')
      .setColor(0x5B8DEA)
      .setDescription(Object.keys(helplist).map(c => '__' + c + '__\n' + helplist[c]).join('\n\n'))
      .setTimestamp();
      msg.edit({ embed: embed2 });
    }
  }
};
