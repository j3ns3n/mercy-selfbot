module.exports = {
  commands: [
    'ping',
    'peng'
  ],
  usage: 'ping',
  description: 'Pong!',
  category: 'Information',
  execute: (bot, msg) => {
    const start = Date.now();

    msg.edit(`Heartbeat Ping: ${bot.ping.toFixed()} ms`).then((newMsg) => {
      let newText = newMsg.content + `\nMessage Ping: ${Date.now() - start} ms`;
      newMsg.edit(newText);
    });
  }
};
