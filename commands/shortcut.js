var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'shortcut',
	description: 'Tilføj shortcut til en kommando',
	async execute(message, args) {

		const command = args[0];
		// console.log(args[0])
		const shortcut = args.slice(1).join(" ")
		if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		if(message.member.roles.cache.some(r => r.name === "Moderator") || message.member.roles.cache.some(r => r.name === "Manager") ) {
			con.query("UPDATE commands SET shortcut='"+shortcut+"' WHERE command='"+command+"'", function (err, result, fields) {
				// console.log(err)
				message.channel.send("Shortcut til kommandoen ``" + command + "`` blev tilføjet!")
			})
		} else {
			message.channel.send("Du har ikke permission til at rode med det her :)")
		}




}

};
