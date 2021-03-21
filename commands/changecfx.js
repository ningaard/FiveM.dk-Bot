var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'changecfx',
	description: 'Ændre CFX på en server',
	async execute(message, args) {

		const oldip = args[0];
		// console.log(args[0])
		const newip = args.slice(1).join(" ")
		if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		if(message.member.roles.cache.some(r => r.name === "Moderator") || message.member.roles.cache.some(r => r.name === "Manager") ) {
			con.query("UPDATE servers SET ip='"+newip+"' WHERE ip='"+oldip+"'", function (err, result, fields) {
				// console.log(err)
				message.channel.send(`CFX blev opdateret fra ${oldip} til ${newip}`)
			})
		} else {
			message.channel.send("Du har ikke permission til at rode med det her :)")
		}




}

};
