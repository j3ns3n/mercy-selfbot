const snekfetch = require('snekfetch');

module.exports = {
  commands: [
    'neko',
    'nekos'
  ],
  usage: 'neko',
  description: 'OwO',
  category: 'Information',
  execute: (bot, msg, args) => {
    snekfetch.get("https://nekos.life/api/neko").then(res => {
      if (res.status !== 200) { return msg.channel.send("**An error has occurred!**") }
      msg.edit("", { embed: new Discord.RichEmbed().setTitle("Random Neko").setImage(res.body.neko).setFooter("Image by nekos.life") })
    });
  }
};
