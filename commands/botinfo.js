const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');

module.exports = {
  commands: [
    'botinfo'
  ],
  usage: 'botinfo <bot mention or id>',
  description: 'Pull Information on a bot from https://discordbots.org.',
  category: 'Information',
  execute: (bot, msg, args) => {
    if(args.length < 1) {
      return msg.edit('**Please provide a bot mention or ID**');
    }

    let id = 0;

    if(msg.mentions.users.first()) {
      id = msg.mentions.users.first().id;
    } else {
      id = args[0];
    }

    snekfetch.get('https://discordbots.org/api/bots/' + id).then((res) => {
      const embed = new RichEmbed()
      .setColor(0x5B8DEA)
      .setTimestamp()
      .setTitle('Bot Info')
      .setFooter(bot.config.strings.github)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${id}/a_${res.body.avatar}.webp`)
      .addField('ID', id)
      .addField('Tag', `${res.body.username}#${res.body.discriminator}`, true)
      .addField('Short Description', res.body.shortdesc)
      .addField('Library', res.body.lib, true)
      .addField('Prefix', res.body.prefix)
      .addField('Upvotes', res.body.points, true)
      .addField('Server Count', typeof res.body.server_count === 'number' ? res.body.server_count : 'This bot doesn\'t post server count!', true)
      .addField('Owner(s)', '<@' + res.body.owners.join('>\n<@') + '>')
      .addField('Invite', '[Here](https://discordapp.com/oauth2/authorize?scope=bot&permissions=0&client_id=' + id + ')', true);
      msg.edit('', { embed });
    })
    .catch(() => {
      return msg.edit('**The bot you are looking for was not found!**');
    });
  }
};
