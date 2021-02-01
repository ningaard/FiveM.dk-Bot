var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'vote',
	description: 'Vote på en server',
	async execute(message, args) {

		const server = args.join(" ");
		const identifier = message.author.id;
		var url = "http://localhost/api/v1/"+server
		axios.get(url)
			.then(function (response) {
				// handle success
				// console.log(response);

				if (server) {
					console.table(response['data'])
					if (typeof response['data']['result6'][0] === "undefined") {
						message.channel.send("Du har ikke defineret en server, ellers findes denne server ikke på vores liste. Tjek listen på https://fivem.dk")
						return;
					}


					con.query("SELECT * FROM votes WHERE identifier = '"+identifier+"' AND curdate = CURDATE()", function (err, result, fields) {
						// console.log(result);
						if (typeof result !== "undefined") {
							if (typeof result[0] !== "undefined") {
								message.channel.send("Du har allerede stemt i dag.")
							}
							else {
								var sql = "INSERT INTO votes (identifier, server, curdate) VALUES ('"+identifier+"', '"+server+"', CURDATE())";
							  con.query(sql, function (err, result) {
							    if (err) throw err;
									message.channel.send("Du har stemt på serveren ``"+server+"`` ("+response['data']['result6'][0]['name']+"), mange tak. - Husk at stem igen i morgen!\nHusk du kan stemme 2 gange hvis du også stemmer inde på https://fivem.dk");
									// message.channel.send(message.author.id)

										var sql = "UPDATE servers SET points=points+1 WHERE ip='"+server+"'";
									  con.query(sql, function (err, result) {
									    if (err) throw err;
									  });
							  });
							}

						}
						else {
							var sql = "INSERT INTO votes (identifier, server, curdate) VALUES ('"+identifier+"', '"+server+"', CURDATE())";
						  con.query(sql, function (err, result) {
						    if (err) throw err;
								message.channel.send("Du har stemt på serveren ``"+server+"`` ("+response['data']['result6'][0]['namr']+"), mange tak. - Husk at stem igen i morgen!");
								// message.channel.send(message.author.id)

									var sql = "UPDATE servers SET points=points+1 WHERE ip='"+server+"'";
								  con.query(sql, function (err, result) {
								    if (err) throw err;
								  });
						  });
						}
					});


				}
				else {
					message.channel.send("Du har ikke defineret en server, ellers findes denne server ikke på vores liste. Tjek listen på https://fivem.dk")
				}
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
