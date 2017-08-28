const util = require('util');
const snekfetch = require('snekfetch');

const config = require('../config.json');

module.exports = {
  commands: [
    'eval'
  ],
  usage: 'eval <code>',
  description: 'Evaluate javascript code as the bot.',
  category: 'Utility',
  execute: (bot, msg, args) => {
    if (args.length > 0) {
      try {
        let result = Promise.resolve(eval(args.join(' ')));
        result.then(result => {
          if (typeof (result) !== 'string') result = util.inspect(result, {
            depth: 2,
            maxArrayLength: 2048
          });
          result = result.split(config.discord.token).join('-- DISCORD TOKEN --');
          if (result.length > 1900 - args.join(' ').length) {
            snekfetch.post('https://feed-the-wump.us/documents').send(result).then((body) => {
              msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**Result was too long, generated hastebin link instead.\nhttps://feed-the-wump.us/' + body.body.key + '.json**');
            }).catch(error => {
              msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**An unexpected error occured while generating hastebin link.**');
            });
          } else {
            msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**Output:**\n```js\n' + result + '```').catch((error) => {
              console.error(error);
            });
          }
        });
      } catch (e) {
        msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**An error occured when attempting to evaluate code!**\n```js\n' + e + '```').catch((error) => {
          console.error(error);
        });
      }
    } else {
      msg.edit(`**Missing code to evaluate.**`);
    }
  }
};
