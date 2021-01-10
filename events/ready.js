const Discord = require('discord.js')
var con = require('../database');

module.exports = {
	name: 'ready',
	async execute(client) {

    client.user.setActivity("FiveM.dk/discord", {
      type: 'WATCHING',
      url: 'https://www.twitch.tv/fivemdk'
    });

    console.log('Botten er startet.' + " Botten er på " + client.guilds.cache.size + " forskellige servere:");
  	const guildNames = client.guilds.cache.map(g => g.name).join("\n")

  		// console.log(guildNames)

    con.query(`SELECT * FROM discords`, async function (err, result, fields) {
			try {
				for (var i = 0; i < result.length; i++) {
				if (typeof result[i] !== "undefined") {

					const channel = await client.guilds.cache.get(result[i]['guild']).channels.cache.get(result[i]['ticketChannel']);

					channel.messages.fetch(result[i]['ticketMessage']);

					console.log(result[i]['name'] + " bruger TICKET systemet")
				}
			}
			} catch (e) {
				console.log(e)
			}
		})




	},
};
