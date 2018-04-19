const { Client } = require('discord.js');
const bot = new Client();

const fs = require('fs');

const config = require('./config.json');

const log = require('./functions/logger');

let start = Date.now();

fs.readdir('./commands/', (error, files) => {

  if(error) {
    throw new Error(error);
  }
  bot.commands = [];

  files.map((file) => {

    bot.commands[file.replace(/\..*/, '')] = require('./commands/' + file);

    if (files.indexOf(file) === files.length - 1) {

      log('Loaded ' + files.length + ' commands! (' + (Date.now() - start) + ' ms)');

      fs.readdir('./events/', (error, files) => {

        if(error) {
          throw new Error(error);
        }

        files.map((file) => {
          let eventRunner = require('./events/' + file);
          let eventName = file.split('.')[0];

          bot.on(eventName, (...args) => eventRunner(bot, ...args));
          if (files.indexOf(file) === files.length - 1) {

            log('Loaded ' + files.length + ' events! (' + (Date.now() - start) + ' ms)');
            bot.login(config.discord.token);
            bot.config = config;
          }
        });
      });
    }
  });
});
