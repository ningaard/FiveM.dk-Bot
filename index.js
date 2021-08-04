const Discord = require('discord.js')
const fetch = require("node-fetch");
var fs = require('fs');
var con = require('./database');
var api = require('./api');
const client = new Discord.Client();
const config = require("./config.json");
var events = require('./handlers/events')(client);
const disbut = require('discord-buttons')(client);

const guildInvites = new Map();

client.on('ready', () => {
	client.events.get('ready').execute(client)
	client.guilds.cache.forEach(guild => {
		guild.fetchInvites()
		.then(invites => guildInvites.set(guild.id, invites))
		.catch(err => console.log(err));
		// console.log(`${guild.name} - ${guild.memberCount}`)
	});


	client.guilds.cache.forEach((guild => {
		if ((guild.channels.cache.find(c => c.name.toLowerCase() === "ghostping"))) {
			console.log(`${guild.name} bruger ghostping`)
		}
	}));



	test = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
	console.log(test)
});


// client.on("message", async message => {
// 	client.events.get('message').execute(message)
// 	client.events.get('log').execute(message)
// })

client.on('message', (message, member) => {
	client.events.get('message').execute(message, client)
	client.events.get('log').execute(message, member)});
	if(message.content==('!d bump') || (message.content==('!d bump '))){
		const channel = message.guild.channels.cache.find(c  => c.name === "bump")

		let embed  = new Discord.MessageEmbed()
			.setTitle(`Bump!`)
			.setDescription(`${message.author}, \nTak for dit bump!\nJeg vil sende en besked, når serveren kan bumpes igen.`)
			.setColor('00FF00')
			.setTimestamp()

		let embed2  = new Discord.MessageEmbed()
		  .setTitle(`Bump!`)
		  .setDescription(`Der kan nu bumpes igen, ved at skrive !d bump . `)
		  .setColor('00FF00')
		  .setTimestamp()

		  channel.send(embed)

		setTimeout(function(){
		  channel.send(embed2)
	  }, 120*60*1000)

	};

client.on('messageReactionAdd', (reaction, user) => {
	client.events.get('createTicket').execute(reaction, user)
});

client.on('clickButton', async (button) => {
  client.events.get('buttons').execute(button, disbut)
});

// client.on('guildMemberAdd', member => {
// 	client.events.get('guildMemberAdd').execute(member, client)
// })



client.on('guildMemberAdd', async member => {
		const cachedInvites = guildInvites.get(member.guild.id);
		const newInvites = await member.guild.fetchInvites();
		guildInvites.set(member.guild.id, newInvites);
		try {
				const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);

				const logChannel = member.guild.channels.cache.find(channel => channel.name === "invites")
				if(logChannel) {
					if (usedInvite) {
						logChannel.send(`<@${member.user.id}> joinede **${member.guild.name}!** <@${member.user.id}> blev inviteret af ${usedInvite.inviter.tag}, (${usedInvite.inviter.tag} har hele **${usedInvite.uses}** invites)`)
					}
					else {
						logChannel.send(`<@${member.user.tag}> joinede **${member.guild.name}!**`)
					}
				}

		}
		catch(err) {
				// console.log(err);
		}
});



client.login(config.token)
