const cleanAndPost = require('../functions/cleanAndPost.js');

module.exports = {
  commands: [
    'eval'
  ],
  usage: 'eval <code>',
  description: 'Evaluate javascript code as the bot.',
  category: 'Utility',
  execute: async (bot, msg, args) => {
    if (args.length > 0) {
      let result = await eval(args.join(' '));
      cleanAndPost(result, msg, args, bot);
    } else {
      msg.edit('**Missing code to evaluate.**');
    }
  }
};
