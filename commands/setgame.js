module.exports = {
  commands: [
    'setgame'
  ],
  usage: 'setgame [-t twitch_url] <game name>',
  description: 'Set your playing status.',
  category: 'Utility',
  execute: (bot, msg, args) => {
    if(args.length < 1) {
      msg.edit('**Reset your game**');
      bot.user.setGame(null, null);
      return;
    }

    if(args[0].toLowerCase() === '-t') {
      if(!args[1].toLowerCase().startsWith('https://twitch.tv/')) {
        return msg.edit('**Invalid Twitch URL**');
      }
      if(args.slice(2).length < 1) {
        return msg.edit('**No game name was submitted**');
      }
      bot.user.setPresence({
        game: {
          name: args.slice(2).join(' '),
          url: args[1],
          type: 1
        }
      });
      msg.edit(`**Set your game to \`${args.slice(2).join(' ')}\`**`);
    } else {
      bot.user.setPresence({
        game: {
          name: args.join(' '),
          type: 0
        }
      });
      msg.edit(`**Set your game to \`${args.join(' ')}\`**`);
    }
  }
};
