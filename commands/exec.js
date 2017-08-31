const util = require('util');
const snekfetch = require('snekfetch');
const child_process = require('child_process');

const config = require('../config.json');

module.exports = {
  commands: [
    'exec'
  ],
  usage: 'exec <code>',
  description: 'Use shell code as the bot.',
  category: 'Utility',
  execute: (bot, msg, args) => {
    if (args.length > 0) {
      try {
        child_process.exec(args.join(' '), (error, stdout, stderr) => {
          let result = (stderr || stdout);
          result = result.split(config.discord.token).join('-- DISCORD TOKEN --');
          result = result.split(bot.user.email).join('-- USER EMAIL --');
          if (result.length > 1900 - args.join(' ').length) {
            snekfetch.post('https://feed-the-wump.us/documents').send(result).then((body) => {
              msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**Result was too long, generated hastebin link instead.\nhttps://feed-the-wump.us/' + body.body.key + '.json**');
            }).catch((error) => {
              msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**An unexpected error occured while generating hastebin link.**');
            });
          } else {
            msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**Output:**\n```js\n' + result + '```').catch((error) => {
              throw new Error(error);
            });
          }
        });
      } catch (e) {
        msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**An error occured when attempting to run command!**\n```js\n' + e + '```').catch((error) => {
          throw new Error(error);
        });
      }
    } else {
      msg.edit('**Missing code to evaluate.**');
    }
  }
};
