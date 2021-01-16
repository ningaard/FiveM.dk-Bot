var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'commands',
  aliases: ["cmd", "cmds"],
	description: 'Printer alle kommandoer.',
	async execute(message, args) {
		var cmds = ""
		const server = args.join(" ");
		con.query("SELECT * FROM commands ", function (err, result, fields) {
			console.log(result[0]['command']);
			// if (typeof result !=="undefined") return false;
			if (typeof result[0] !== "undefined") {

				if (typeof result[0]['command'] !== "undefined" ) {

					for (var i = 0; i < result.length; i++) {
						y = i + 1
						cmds += `**${y}.** ***${result[i]['command']}***\n`
						// console.log(i + " = " + result.length)
						if (i+1 == result.length) {
							message.channel.send(`**Alle kommandoer:**\n${cmds}`);
						}
					}

				}
			}
		})




}

};
