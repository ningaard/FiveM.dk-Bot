var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;



module.exports = {
	name: 'modder',
	description: 'Tjek om der er en modder på en server',
	async execute(message, args) {

		modder = false;

		const server = args[0];

		if (!server) return;
		// console.log(args[0])
		var url = "https://servers-frontend.fivem.net/api/servers/single/"+server
		axios.get(url)
			.then(function (response) {
				// handle success
				for (var i = 0; i < response['data']['Data']['players'].length; i++) {
					identifier = response['data']['Data']['players'][i]['identifiers'][0]
					steam = identifier.replace("steam:","")
					console.log(steam)

					axios.get("http://64.225.105.125:8081/verify="+identifier)
						.then(function (response) {
							if (response['data'] == false) {
								message.channel.send("Der er en registreret modder på denne server")
								modder = true
							}
						})

				}
				if (modder == false) {
					message.channel.send("Fandt ingen registerede moddere på denne server")
				}


			 })
			.catch(function (error) {
				// handle error
				console.log(error);
			 })
			.then(function () {
				// always executed
			});




}

};
