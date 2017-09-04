const dateFormat = require('dateformat');
const { RichEmbed } = require('discord.js');

module.exports = {
  commands: [
    'userinfo'
  ],
  usage: 'userinfo <user mention or id>',
  description: 'Get information on a Discord user.',
  category: 'Information',
  execute: (bot, msg, args) => {
    if(args.length < 1) {
      return msg.edit('**Please provide a user mention or ID**');
    }
    if(!msg.guild) {
      return msg.edit('**This command can only be used in a server**');
    }
    let user = bot.users.get((msg.mentions.users.first() && msg.mentions.users.first().id) || args[0]);
    if(!user) {
      return msg.edit('**A user with that ID was not found!**');
    }
    let member = msg.guild.members.get(user.id);
    if(!member) {
      return msg.edit('**A user with that ID was not found!**');
    }
    // Code below was totally not stolen from SharpBot
    const millisCreated = new Date().getTime() - user.createdAt.getTime();
    const daysCreated = millisCreated / 1000 / 60 / 60 / 24;

    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const daysJoined = millisJoined / 1000 / 60 / 60 / 24;

    let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map((role) => role.name);
    if (roles.length < 1) {
      roles = ['None'];
    }

    const embed = new RichEmbed()
    .setTitle(`${user.tag} | ${user.id}`)
    .addField('Status', `${user.presence.status[0].toUpperCase() + user.presence.status.slice(1)}`, true)
    .addField('Game', `${(user.presence.game && user.presence.game && user.presence.game.name) || 'Not playing a game.'}`, true)
    .addField('Created On', `${dateFormat(user.createdAt)}`, true)
    .addField('Days Since Creation', `${daysCreated.toFixed(0)}`, true)
    .addField('Joined On', `${dateFormat(member.joinedAt)}`, true)
    .addField('Days Since Joining', `${daysJoined.toFixed(0)}`, true)
    .addField('Roles', `${roles.join(', ')}`, false)
    .setFooter('https://github.com/LarK1n/mercy-selfbot')
    .setThumbnail(user.avatarURL)
    .setColor(0x5B8DEA)
    .setTimestamp();
    msg.edit({ embed });
  }
};
