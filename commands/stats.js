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
		var url = "http://localhost/api/v1/"+server
		axios.get(url)
			.then(function (response) {
				// handle success
				// console.log(response);
				const embed = new Discord.MessageEmbed();

				if (typeof response['data']['result6'][0]['name'] === "undefined") {
					message.channel.send("Denne server findes ikke på vores liste. Tjek listen på https://fivem.dk")
					return;
				}

				if (!response['data']['result6'][0]['name'] == "FiveM.dk") {
				} else {
					embed.setTitle("FiveM.dk - Overall stats")
				}
				embed.setTitle(response['data']['result6'][0]['name'] + " - stats")
				embed.setAuthor("FiveM.dk")


				embed.setColor(0x00AE86)
				embed.addField("Votes i alt", response['data']['result'][0]['total'], true)
				embed.addField("Votes i dag", response['data']['result2'][0]['today'], true)
				embed.addField("Forskellige voters", response['data']['result3'][0]['ips'], true)
				embed.addField("Samlet spillertal", response['data']['result4'][0]['clients'], true)
				embed.setFooter(config.footer);

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
