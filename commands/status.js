var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'status',
	description: 'Viser status på en resource',
	async execute(message, args) {

		const server = args[0];
		console.log(server)
		const resource = args.slice(1).join(" ")
		console.log(resource)
		var url = "https://servers-frontend.fivem.net/api/servers/single/"+server
		axios.get(url)
			.then(function (response) {
				// handle success
				// console.log(response);
				status = "ikke startet"
				resources = response['data']['Data']['resources'];

				sorted = [];
				for (var i = 0; i < resources.length; i++) {
					sorted.push(resources[i].toLowerCase());
				}
				sorted.sort();

				if (sorted.includes(resource.toLowerCase())) {
					status = "Startet";
				} else {
					status = "Ikke startet"
				}
				message.channel.send(`Status på resourcen **${resource}**: ${status}`);


			 })
			.catch(function (error) {
				// handle error
			 	console.log(error);
			 });


	},
};
