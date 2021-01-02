var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'closeticket',
	description: 'Lukker en ticket',
	async execute(message, args) {

		const role = args.slice(0).join(" ")
		if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Det må du ikke det der")

		guild = message.guild.id
			con.query(`SELECT ticketCategory from discords WHERE guild = ${guild}`, function (err, result, fields) {
				if (typeof result[0] !== "undefined") {
					const categoryId = result[0]['ticketCategory']; //gør så man kun kan lukke tickets i den category som tickets bliver oprettet i

				  if (message.channel.parentID == categoryId) {
						
				    message.channel.delete();
				    var embed = new Discord.MessageEmbed();
				      embed.setTitle("Ticket: " + message.channel.name)
				      embed.setDescription(
				        `Ticket: ${message.channel.name} blev afsluttet af ${message.author}.`
				      )
				      embed.setFooter(message.author.username, message.author.displayAvatarURL)
				      embed.setTimestamp();

				    const logChannel = message.guild.channels.cache.find(channel => channel.name === "logs")
				    if (!logChannel)
				      return message.channel.send("Kan ikke finde log kanalen");
				    logChannel.send(embed);
				  } else {
				    return message.channel.send("Denne kanal er ikke i ticket kategorien.")
				  }
				}
			})





}

};
