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
					allIdentifiers = response['data']['Data']['players'][i]['identifiers']
					name = response['data']['Data']['players'][i]['name']
					steam = identifier.replace("steam:","")
					length = response['data']['Data']['players'].length

					check = checkBanned(identifier,name,i,length,message,allIdentifiers,server)

				}


			 })



}

};


async function checkBanned(identifier,name,i,length,message,allIdentifiers,server) {
	// console.log(identifier)
	// console.log(name)
	axios.get("http://localhost/defender/single/"+identifier)
		.then(function await (response) {
			// console.log(response['data'])
			if (response['data'] == false) {
				con.query("SELECT * FROM servers WHERE ip = '"+server+"'", function (err, result, fields) {
					// console.log(result);
					if (typeof result[0] !== "undefined") {
						modder = true
						var ids = JSON.stringify(allIdentifiers, null, 2);
						const embed = new Discord.MessageEmbed();
							embed.setTitle("Modder fundet")
							embed.setAuthor("FiveM.dk")
							embed.setThumbnail(result[0]['logo'])

							embed.setColor(0x00AE86)
							embed.setDescription("```json\n" + ids + "```", false)
							embed.addField("Server ", result[0]['name'], false)

							embed.setFooter(config.footer);

							message.channel.send({embed});
						isBanned = "Banned!"
						return isBanned;
					}
				})
			}

			if (i === length - 1) {
				if (!modder) {
					message.channel.send("Serveren blev tjekket igennem.")
				}
			}
		})

}
