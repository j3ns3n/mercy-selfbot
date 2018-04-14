const dateFormat = require("dateformat");
const { RichEmbed } = require("discord.js");

module.exports = {
  commands: ["serverinfo"],
  usage: "serverinfo",
  description: "Get information on the current server.",
  category: "Information",
  execute: (bot, msg) => {
    if (!msg.guild) {
      msg.edit("**This can only be used in a guild!**");
    }

    const millis = new Date().getTime() - msg.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;

    const owner = msg.guild.owner.user || {};

    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];

    const embed = new RichEmbed()
      .setTitle(`${msg.guild.name}`)
      .addField("Created On", `${dateFormat(msg.guild.createdAt)}`, true)
      .addField("Days Since Creation", `${days.toFixed(0)}`, true)
      .addField("Default Channel", `${msg.guild.defaultChannel}`, true)
      .addField("Region", `${msg.guild.region}`, true)
      .addField(
        "Member Count",
        `${
          msg.guild.members.filter(
            member => member.presence.status !== "offline"
          ).size
        } / ${msg.guild.memberCount}`,
        true
      )
      .addField("Owner", `${owner.username || "None"}`, true)
      .addField(
        "Text Channels",
        `${msg.guild.channels.filter(member => member.type === "text").size}`,
        true
      )
      .addField(
        "Voice Channels",
        `${msg.guild.channels.filter(member => member.type === "voice").size}`,
        true
      )
      .addField(
        "Verification Level",
        `${verificationLevels[msg.guild.verificationLevel]}`,
        true
      )
      .addField("Roles", `${msg.guild.roles.size}`, true)
      .setFooter(bot.config.strings.github)
      .setColor(0x5b8dea)
      .setTimestamp();

    msg.edit({ embed });
  }
};
