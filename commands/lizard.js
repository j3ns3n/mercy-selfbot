const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');

module.exports = {
  commands: [
    'lizard',
    'lizards'
  ],
  usage: 'lizard',
  description: 'Lizards o.O',
  category: 'Fun',
  execute: (bot, msg) => {
    snekfetch.get('https://nekos.life/api/lizard').then((res) => {
      if (res.status !== 200) {
        return msg.channel.send('**An error has occurred!**');
      }

      msg.edit('', {
        embed: new RichEmbed()
          .setColor(0x5B8DEA)
          .setTitle('Random Lizards')
          .setImage(res.body.url)
          .setFooter(`${bot.config.strings.github} | Image by nekos.life`)
      });
    });
  }
};
