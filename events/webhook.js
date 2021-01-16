const Discord = require('discord.js')
var con = require('../database');
const config = require("../config.json");
// const client = new Discord.Client();
// var commands = require('../handlers/commands')(client);

module.exports = {
	name: 'webhook',
	async execute(client, message) {
			var server = client.guilds.cache.get('621288307099303966');
			server.channels.cache.get('687445302755721289').send(message);
	},
};
