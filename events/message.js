const Discord = require('discord.js')
var con = require('../database');
const config = require("../config.json");
const client = new Discord.Client();
var commands = require('../handlers/commands')(client);

module.exports = {
	name: 'message',
	async execute(message) {
		let besked = message.content;
	  let person = message.author;
	  let kanal = message.channel.name;

	  if(message.author.bot) return;


	  if(message.content.indexOf(config.prefix) !== 0) return;
	  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	  const command = args.shift().toLowerCase();

		var server = message.guild.id

		con.connect(function(err) {
			    con.query("SELECT * FROM commands", function (err, result, fields) {
			      // console.log(result);
						if (result) {

			      for (var i = 0; i < result.length; i++) {
			        if (message.content.toLowerCase() == "!" + result[i]['command'].toLowerCase()) {
								// console.log("test")

								const embed = new Discord.MessageEmbed();
								embed.setTitle(result[i]['shortcut'])
								embed.setAuthor("FiveM.dk")
								embed.addField("Svar", result[i]['answer'], true)
								embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');
								message.channel.send({embed});
			        }
			      }
					}
			    });
			  });

	  if (!client.commands.has(command)) return;

	  try {
	  	client.commands.get(command).execute(message, args);
	  } catch (error) {
	  	console.error(error);
	  	message.reply('Der skete en fejl');
	  }
	},
};
