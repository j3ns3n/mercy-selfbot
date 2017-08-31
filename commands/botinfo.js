const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');

const getBotInfo = (id, msg) => {
  snekfetch.get('https://discordbots.org/api/bots/' + id).then((r) => {
    const embed = new RichEmbed()
    .setColor(0x5B8DEA)
    .setTimestamp()
    .setTitle('Bot Info')
    .setFooter('https://github.com/LarK1n/mercy-selfbot')
    .setThumbnail('https://cdn.discordapp.com/avatars/' + id + '/a_' + r.body.avatar + '.webp')
    .addField('ID', id)
    .addField('Tag', r.body.username + '#' + r.body.discriminator, true)
    .addField('Short Description', r.body.shortdesc)
    .addField('Library', r.body.lib, true)
    .addField('Prefix', r.body.prefix)
    .addField('Upvotes', r.body.points, true)
    .addField('Server Count', r.body.server_count, true)
    .addField('Owner(s)', '<@' + r.body.owners.join('>\n<@') + '>')
    .addField('Invite', '[Here](https://discordapp.com/oauth2/authorize?scope=bot&permissions=0&client_id=' + id + ')', true);
    msg.edit('', {embed});
  }).catch((err) => {
    return msg.edit('**The bot you are looking for was not found!**');
  });
}

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
    if(!msg.mentions.users.first()) {
      getBotInfo(args[0], msg);
    } else {
      getBotInfo(msg.mentions.users.first().id, msg);
    }
  }
};
