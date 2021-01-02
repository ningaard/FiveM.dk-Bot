const Discord = require('discord.js')
var fs = require('fs');

module.exports = (client) => {

  //Command handler
  client.commands = new Discord.Collection();
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
  	const command = require(`../commands/${file}`);

  	client.commands.set(command.name, command);

  	if (typeof command.aliases !== "undefined") {
  		for (var i = 0; i < command.aliases.length; i++) {
  			client.commands.set(command.aliases[i], command);
  		}
  	}
  }
};
