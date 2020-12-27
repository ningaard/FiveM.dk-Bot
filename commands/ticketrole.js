var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'ticketrole',
	description: 'Ændre rollen som kan læse tickets',
	async execute(message, args) {

		const role = args.slice(0).join(" ")
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Det må du ikke det der")

		guild = message.guild.id
			con.query("UPDATE discords SET role='"+role+"' WHERE guild='"+guild+"'", function (err, result, fields) {
				// console.log(err)
				message.channel.send("Ticketrole blev sat til ``" + role + "``!")
			})





}

};
