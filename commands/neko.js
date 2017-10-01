const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');

module.exports = {
  commands: [
    'neko',
    'nekos'
  ],
  usage: 'neko',
  description: 'OwO',
  category: 'Fun',
  execute: (bot, msg) => {
    snekfetch.get('https://nekos.life/api/neko').then((res) => {
      if (res.status !== 200) {
        return msg.channel.send('**An error has occurred!**');
      }

      msg.edit('', {
        embed: new RichEmbed()
        .setColor(0x5B8DEA)
        .setTitle('Random Neko')
        .setImage(res.body.neko)
        .setFooter('https://github.com/MercyDoesCode/mercy-selfbot | Image by nekos.life')
      });
    });
  }
};
