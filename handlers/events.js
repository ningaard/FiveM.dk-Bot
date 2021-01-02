const Discord = require('discord.js')
var fs = require('fs');

module.exports = (client) => {



//Event handler
  client.events = new Discord.Collection();
  const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
  	const event = require(`../events/${file}`);
  	client.events.set(event.name, event);
  }
};
