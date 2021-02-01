var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'search',
	description: 'Søger efter servere med en navngiven resource',
	async execute(message, args) {

		const resource = args[0];

		var tal = 0;
		con.query("SELECT * FROM servers", function (err, result, fields) {
			console.log(result[0]['ip']);
			// if (typeof result !=="undefined") return false;
			if (typeof result[0] !== "undefined") {

				if (typeof result[0]['ip'] !== "undefined" ) {

					for (var i = 0; i < result.length; i++) {
						var url = "https://servers-frontend.fivem.net/api/servers/single/"+result[i]['ip']
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
									tal++;
									message.channel.send(`Fandt resourcen **${resource}** på serveren **${result[i]['ip']}**`);
								} else {

									message.channel.send(`Fandt resourcen **${resource}** på serveren **${result[i]['ip']}**`);
								}
								// message.channel.send(`Tal: ${tal}`);


							 })
							.catch(function (error) {
								// handle error
							 	// console.log(error);
							 });
					}

				}

			}
		})




	},
};
