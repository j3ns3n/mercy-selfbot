const Twit = require('twit');

module.exports = {
  commands: [
    'tweet'
  ],
  usage: 'tweet <text to tweet>',
  description: 'Tweet messages from Discord!',
  category: 'Fun',
  execute: (bot, msg, args) => {
    /* eslint-disable camelcase */
    const twitRunner = new Twit({
      consumer_key: bot.config.twitter.consumer_key,
      consumer_secret: bot.config.twitter.consumer_secret,
      access_token: bot.config.twitter.access_token,
      access_token_secret: bot.config.twitter.access_token_secret
    });
    /* eslint-enable camelcase */
    if(args.length < 1) {
      return msg.edit('**Missing text to tweet.**');
    }

    if(args.join(' ').length > 140) {
      return msg.edit('**Tweet too long.**');
    }

    twitRunner.post('statuses/update', { status: args.join(' ') }, (err, data) => {
      if(err) {
        return;
      }

      msg.edit('**Tweet sent!**\nhttps://twitter.com/' + data.user.screen_name + '/status/' + data.id_str);
    });
  }
};
