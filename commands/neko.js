const snekfetch = require("snekfetch");
const { RichEmbed } = require("discord.js");

module.exports = {
  commands: ["neko", "nekos"],
  usage: "neko",
  description: "OwO",
  category: "Fun",
  execute: (bot, msg) => {
    msg.edit("", {
      embed: new RichEmbed()
        .setColor(0x5b8dea)
        .setTitle("Random Nekos")
        .setImage(bot.getNeko("neko"))
        .setFooter(`${bot.config.strings.github} | Image by nekos.life`)
    });
  }
};
