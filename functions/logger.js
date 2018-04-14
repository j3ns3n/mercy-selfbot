const dateformat = require("dateformat");

/* eslint-disable no-console */
module.exports = msg => {
  console.log(
    dateformat(Date.now(), "hh:MM:ss TT") + " | [Mercy-Selfbot] " + msg
  );
};
