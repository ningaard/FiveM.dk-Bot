const Discord = require('discord.js')
const fetch = require("node-fetch");
var fs = require('fs');
var con = require('./database');
const twitch = require('./twitch.js')



const client = new Discord.Client();
const config = require("./config.json");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);

	if (typeof command.aliases !== "undefined") {
		for (var i = 0; i < command.aliases.length; i++) {
			client.commands.set(command.aliases[i], command);
		}
	}
}

console.table(client.commands)
//Laver et tabel med mulige commands - Ikke til produktion.


client.on("ready", () => {

  console.log(`Botten er startet.`);


});




client.on("message", async message => {



  let besked = message.content;
  let person = message.author;
  let kanal = message.channel.name;

  if(message.author.bot) return;


  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

	var server = message.guild.id
	console.log(server)

	con.connect(function(err) {
	    con.query("SELECT * FROM commands WHERE active = 1 and guild ='"+server+"'", function (err, result, fields) {
	      console.log(result);
	      for (var i = 0; i < result.length; i++) {
	        if (message.content == "!" + result[i]['command']) {
						console.log("test")
	          message.channel.send(result[i]['answer'])
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



})

client.login(config.token)
