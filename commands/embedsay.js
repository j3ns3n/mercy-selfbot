const { RichEmbed } = require('discord.js');

module.exports = {
  commands: [
    'say',
    'esay'
  ],
  usage: 'embedsay [texthere]',
  description: 'Takes words you put in and Puts them in a embed!',
  category: '',
  execute: (bot, msg, args) => {
  if (args.length > 0) msg.channel.send("Add something after the command silly!") return;
    const embed = new RichEmbed()
    .setTitle(args.join(" "))
  }
};
