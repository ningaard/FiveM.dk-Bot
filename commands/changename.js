var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'changename',
	description: 'Ændre navn på en server',
	async execute(message, args) {

		const cfx = args[0];
		// console.log(args[0])
		const name = args.slice(1).join(" ")
		if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		if(message.member.roles.cache.some(r => r.name === "Moderator") || message.member.roles.cache.some(r => r.name === "Manager") ) {
			con.query("UPDATE servers SET name='"+name+"' WHERE ip='"+cfx+"'", function (err, result, fields) {
				// console.log(err)
				message.channel.send(`Navnet på serveren blev opdateret til ${name} | CFX: ${cfx}`)
			})
		} else {
			message.channel.send("Du har ikke permission til at rode med det her :)")
		}




}

};
