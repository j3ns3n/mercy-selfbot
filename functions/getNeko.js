const snekfetch = require('snekfetch');

const getURL = (endpoint) => {
  snekfetch.get(`https://nekos.life/api/${endpoint}`).then((res) => {
    if (res.status !== 200) {
      return msg.channel.send('**An error has occurred!**');
    }
    return res.body.url;
  }
};

module.exports = getURL;
