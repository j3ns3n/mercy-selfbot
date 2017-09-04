const snekfetch = require('snekfetch');
const util = require('util');
const config = require('../config.json');
/* eslint-disable no-param-reassign, max-params */
module.exports = (result, msg, args, bot) => {

  if (typeof result !== 'string') {
    result = util.inspect(result, {
      depth: 2,
      maxArrayLength: 2048
    });
  }

  result = result.split(config.discord.token).join('-- DISCORD TOKEN --');
  result = result.split(bot.user.email).join('-- USER EMAIL --');
  result = result.split(config.twitter.consumer_key).join('-- TWITTER / CONSUMER KEY --');
  result = result.split(config.twitter.consumer_secret).join('-- TWITTER / CONSUMER SECRET --');
  result = result.split(config.twitter.access_token).join('-- TWITTER / ACCESS TOKEN --');
  result = result.split(config.twitter.access_token_secret).join('-- TWITTER / ACCESS TOKEN SECRET --');

  if (result.length > 1900 - args.join(' ').length) {
    snekfetch.post('https://feed-the-wump.us/documents').send(result).then((body) => {
      msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**Result was too long, generated hastebin link instead.\nhttps://feed-the-wump.us/' + body.body.key + '.json**');
    }).catch(() => {
      msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**An unexpected error occured while generating hastebin link.**');
    });
  } else {
    msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**Output:**\n```js\n' + result + '```').catch((error) => {
      throw new Error(error);
    });
  }
};
