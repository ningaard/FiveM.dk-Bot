var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'cfx',
	description: 'Top 10.',
	async execute(message, args) {

		const server = args.join(" ");
		con.query("SELECT * FROM servers WHERE name = '"+server+"'", function (err, result, fields) {
			// console.log(result);
			if (typeof result[0] !== "undefined") {

				if (typeof result[0]['name'] !== "undefined" ) {


					message.channel.send("``"+result[0]['name']+"``'s cfx.re IP er **``"+result[0]['ip']+"``**");

				}
				else {
					message.channel.send("Denne server findes ikke. Kig på https://fivem.dk")
				}
			}
			else {
				message.channel.send("Denne server findes ikke. Kig på https://fivem.dk")
			}
		})




}

};
