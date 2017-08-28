module.exports = {
  commands: [
    'neko',
    'nekos'
  ],
  usage: 'neko',
  description: 'OwO',
  category: 'Information',
  execute: (bot, msg, args) => {
    const superagent = require("superagent")
  superagent.get("https://nekos.life/api/neko", (err, res) => {
            if (err) { return msg.channel.send(":x: An error has occurred. Details: " + err) }
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Random Neko").setImage(res.body.neko).setFooter("Image by nekos.life") })
             });
  }
};

