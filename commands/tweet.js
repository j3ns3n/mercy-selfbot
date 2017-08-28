const config = require('../config.json');

const twit = require('twit');
const twitRunner = new twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret
});

module.exports = {
  commands: [
    'tweet'
  ],
  usage: 'tweet <text to tweet>',
  description: 'Tweet messages from Discord!',
  category: 'Fun',
  execute: (bot, msg, args) => {
    if(args.length < 1) return msg.edit('**Missing text to tweet.**');
    if(args.join(' ').length > 140) return msg.edit('**Tweet too long.**');

    twitRunner.post('statuses/update', { status: args.join(' ') }, function(err, data, response) {
      if(err) return console.error(err);
      // console.log(data);
      // console.log(response);
      msg.edit('**Tweet sent!**\nhttps://twitter.com/' + data.user.screen_name + '/status/' + data.id_str)
    })
  }
};
