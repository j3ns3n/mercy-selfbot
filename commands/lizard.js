const { RichEmbed } = require("discord.js");

module.exports = {
  commands: ["lizard", "lizards"],
  usage: "lizard",
  description: "Lizards o.O",
  category: "Fun",
  execute: (bot, msg) => {
    msg.edit("", {
      embed: new RichEmbed()
        .setColor(0x5b8dea)
        .setTitle("Random Lizards")
        .setImage(bot.getNeko("lizard"))
        .setFooter(`${bot.config.strings.github} | Image by nekos.life`)
    });
  }
};
