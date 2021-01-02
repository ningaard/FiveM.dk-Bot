var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'setup',
	description: 'Bruges til at sætte ticket systemet op',
	async execute(message, args) {

		if (!message.member.hasPermission('ADMINISTRATOR')) return;

		let role = message.guild.roles.cache.find(r => r.name === "@everyone");
		message.guild.channels.create('tickets', {
			type: 'category',
			permissionsOverwrites: [{
				type: 'role',
				id: role.id,
				deny: ['VIEW_CHANNEL']
			}]
		}).then((cat => {

			cat.guild.channels.create("Opret-ticket", "text").then((channel) => {

					channel.setParent(cat.id).then((parent) => {


						let role = message.guild.roles.cache.find(r => r.name === "@everyone");

						channel.overwritePermissions([
							{
								type: 'role',
									id: role.id,
									allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
							},
							{
								id: message.author.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES'],
							}

						]);



							var embed = new Discord.MessageEmbed()
									.setTitle("FiveM Ticket System")
									.setDescription("Opret en ticket ved at reagere på ✉️ nedenfor.");
									// .setDescription("Opret en ticket ved at reagere på brevet nedenfor.")

									parent.send({embed: embed}).then(embedMessage => {
		    						embedMessage.react("✉️");
										con.query(`INSERT INTO discords (name, guild, ticketCategory, ticketChannel, ticketMessage) VALUES (?, ?, ?, ?, ?)`,[message.guild.name, message.guild.id, cat.id, parent.id, embedMessage.id], function (err, result, fields) {
											message.channel.send("Ticket systemet blev sat op - alle tickets ryger nu under kategorien TICKETS.")
											console.log(err)
										})
									});
					}).catch(err => {
						console.log(err)
							message.channel.send("Der skete en fejl");
					});

			}).catch(err => {
					message.channel.send("Der skete en fejl");
					console.log(err)
			});

			console.log(message.guild.name)

		}))


}


};
