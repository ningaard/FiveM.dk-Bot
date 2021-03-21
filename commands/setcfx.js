var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'setcfx',
	description: 'Sæt CFX for en guild',
	async execute(message, args) {

		const server = args[0];
		const guild = message.guild.id;
		// console.log(args[0])
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Det må du ikke det der")

		// if(message.member.roles.cache.some(r => r.name === "Moderator") || message.member.roles.cache.some(r => r.name === "Manager") ) {
			con.query("UPDATE servers SET guild=? WHERE ip=?",[guild,server], function (err, result, fields) {
				// console.log(err)
				message.channel.send(`CFX for denne Discord blev sat til: **${server}**`)
			})
		// }
		// else {
		// 	message.channel.send("Du har ikke permission til at rode med det her :)")
		// }




}

};
