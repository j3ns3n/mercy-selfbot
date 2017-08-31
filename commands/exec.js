const util = require('util');
const cleanAndPost = require('../functions/cleanAndPost.js');
const child_process = require('child_process');

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
          cleanAndPost(result, msg);
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
