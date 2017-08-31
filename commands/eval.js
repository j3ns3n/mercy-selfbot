const util = require('util');
const cleanAndPost = require('../functions/cleanAndPost.js');

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
        result.then((result) => {
          cleanAndPost(result, msg);
        });
      } catch (e) {
        msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**An error occured when attempting to evaluate code!**\n```js\n' + e + '```').catch((error) => {
          console.error(error);
        });
      }
    } else {
      msg.edit('**Missing code to evaluate.**');
    }
  }
};
