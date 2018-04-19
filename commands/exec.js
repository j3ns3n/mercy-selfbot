const cleanAndPost = require('../functions/cleanAndPost.js');
const childProcess = require('child_process');

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
        childProcess.exec(args.join(' '), (error, stdout, stderr) => {
          let result = stderr || stdout;
          cleanAndPost(result, msg, args, bot);
        });
      } catch (error) {
        msg.edit('**Input:**\n```js\n' + args.join(' ') + '```\n**An error occured when attempting to run command!**\n```js\n' + error + '```').catch((error) => {
          throw new Error(error);
        });
      }
    } else {
      msg.edit('**Missing code to evaluate.**');
    }
  }
};
