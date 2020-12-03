const Discord = require('discord.js')
const fetch = require("node-fetch");
var fs = require('fs');
var con = require('./database');
var api = require('./api');



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

	client.user.setActivity("FiveM.dk/discord", {
    type: 'WATCHING',
    url: 'https://www.twitch.tv/fivemdk'
});

  console.log('Botten er startet.' + " Botten er på " + client.guilds.cache.size + " forskellige servere:");
	const guildNames = client.guilds.cache.map(g => g.name).join("\n")

		console.log(guildNames)




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
		    con.query("SELECT * FROM commands", function (err, result, fields) {
		      // console.log(result);
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
