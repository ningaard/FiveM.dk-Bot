var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'stats',
	description: 'Viser stats om en server',
	async execute(message, args) {

		const server = args.join(" ");
		var url = "https://fivem.dk/functions/api.php?server="+server
		axios.get(url)
			.then(function (response) {
				// handle success
				// console.log(response);
				const embed = new Discord.MessageEmbed();

				if (typeof response['data']['server_name'] === "undefined") {
					message.channel.send("Denne server findes ikke på vores liste. Tjek listen på https://fivem.dk")
					return;
				}

				if (!response['data']['server_name'] == "FiveM.dk") {
				} else {
					embed.setTitle("FiveM.dk - Overall stats")
				}
				embed.setTitle(response['data']['server_name'] + " - stats")
				embed.setAuthor("FiveM.dk")


				embed.setColor(0x00AE86)
				embed.addField("Votes i alt", response['data']['votes_all'], true)
				embed.addField("Votes i dag", response['data']['votes_today'], true)
				embed.addField("Forskellige voters", response['data']['voters'], true)
				embed.addField("Samlet spillertal", response['data']['clients'], true)
				embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');

				message.channel.send({embed});
			 })
			.catch(function (error) {
				// handle error
			 	console.log(error);
			 })
			.then(function () {
			 	// always executed
			});









	},
};
