var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'top',
	description: 'Top 10.',
	async execute(message, args) {


		con.query("SELECT * FROM servers WHERE active = 1 ORDER BY points DESC LIMIT 10", function (err, result, fields) {
			// console.log(result);
			if (result) {
					const embed = new Discord.MessageEmbed();
				embed.setTitle("FiveM.dk - Top 10")
				embed.setAuthor("FiveM.dk")


				embed.setColor(0x00AE86)
				for (var i = 0; i < 10; i++) {
					var s = i + 1
					embed.addField(s+". " + result[i]['name'], "Points: " + result[i]['points'], false)
				}
				embed.setFooter(config.footer);

				message.channel.send({embed});

			}
		})








}

};
