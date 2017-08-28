const { Client } = require('discord.js');
const bot = new Client();

const config = require('./config.json');

bot.login(config.discord.token);
