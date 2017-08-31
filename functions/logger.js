const dateformat = require('dateformat');

module.exports = (msg) => {
  console.log(dateformat(Date.now(), 'hh:MM:ss TT') + ' | [Mercy-Selfbot] ' + msg);
};
