const { RichEmbed } = require('discord.js');

module.exports = {
  commands: [
    'embedsay',
    'say',
    'esay'
  ],
  usage: 'embedsay <texthere>',
  description: 'Takes words you put in and Puts them in a embed!',
  category: 'Other',
  execute: (bot, msg, args) => {
  if (args.length > 0) {
    const embed = new RichEmbed()
    .setTitle(args.join(' '));
    msg.edit({embed});
  } else {
    return msg.edit('**Add something after the command silly!**');
  }
}
