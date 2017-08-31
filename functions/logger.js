const dateformat = require('dateformat');

module.exports = (msg) => {
  process.stdout.write(dateformat(Date.now(), 'hh:MM:ss TT') + ' | [Mercy-Selfbot] ' + msg + '/n'); // Fucking ESLINT doesn't want `console.log()` so eat my process ya dick
};
