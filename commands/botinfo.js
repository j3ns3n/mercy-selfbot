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
    if(args.length < 1) return msg.edit('**Please provide a bot mention or ID**');
    if(!msg.mentions.users.first()) {
      snekfetch.get('https://discordbots.org/api/bots/' + args[0]).then(r => {
        if(r.status !== 200) return msg.edit('**The bot you are looking for was not found!**');

        const embed = new RichEmbed()
        .setColor(0x5B8DEA)
        .setTimestamp()
        .setTitle('Bot Info')
        .setFooter('https://github.com/LarK1n/mercy-selfbot')
        .setThumbnail('https://cdn.discordapp.com/avatars/' + args[0] + '/a_' + r.body.avatar + '.webp')
        .addField('ID', args[0])
        .addField('Tag', r.body.username + '#' + r.body.discriminator, true)
        .addField('Short Description', r.body.shortdesc)
        .addField('Library', r.body.lib, true)
        .addField('Prefix', r.body.prefix)
        .addField('Upvotes', r.body.points, true)
        .addField('Server Count', r.body.server_count, true)
        .addField('Owner(s)', '<@' + r.body.owners.join('>\n<@') + '>')
        .addField('Invite', '[Here](https://discordapp.com/oauth2/authorize?scope=bot&permissions=0&client_id=' + args[0] + ')', true);
        msg.edit('', {embed})
      }).catch(err =>{
        return msg.edit('**The bot you are looking for was not found!**');
      });
    } else {
      snekfetch.get('https://discordbots.org/api/bots/' + msg.mentions.users.first().id).then(r => {
        if(r.status !== 200) return msg.edit('**The bot you are looking for was not found!**');

        const embed = new RichEmbed()
        .setColor(0x5B8DEA)
        .setTimestamp()
        .setTitle('Bot Info')
        .setFooter('https://github.com/LarK1n/mercy-selfbot')
        .setThumbnail('https://cdn.discordapp.com/avatars/' + msg.mentions.users.first().id + '/a_' + r.body.avatar + '.webp')
        .addField('ID', msg.mentions.users.first().id)
        .addField('Tag', r.body.username + '#' + r.body.discriminator, true)
        .addField('Short Description', r.body.shortdesc)
        .addField('Library', r.body.lib, true)
        .addField('Prefix', r.body.prefix)
        .addField('Upvotes', r.body.points, true)
        .addField('Server Count', r.body.server_count, true)
        .addField('Owner(s)', '<@' + r.body.owners.join('>\n<@') + '>')
        .addField('Invite', '[Here](https://discordapp.com/oauth2/authorize?scope=bot&permissions=0&client_id=' + msg.mentions.users.first().id + ')', true);
        msg.edit('', {embed})
      }).catch(err =>{
        return msg.edit('**The bot you are looking for was not found!**');
      });
    }
  }
}
