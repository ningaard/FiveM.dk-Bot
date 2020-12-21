var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'about',
	description: 'Tilføj en om side til en server',
	async execute(message, args) {

		const server = args[0];
		// console.log(args[0])
		const about = args.slice(1).join(" ")
		if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		if(message.member.roles.cache.some(r => r.name === "Moderator") || message.member.roles.cache.some(r => r.name === "Manager") ) {
			con.query("UPDATE servers SET about=? WHERE ip=?",[about,server], function (err, result, fields) {
				// console.log(err)
				message.channel.send(`Teksten blev ændret til: **${about}**`)
			})
		} else {
			message.channel.send("Du har ikke permission til at rode med det her :)")
		}




}

};
