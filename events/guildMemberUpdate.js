const Discord = require('discord.js')
var con = require('../database');

module.exports = {
	name: 'guildMemberUpdate',
	async execute(member, status, client) {
		var server = client.guilds.cache.get('621288307099303966');
		if (status === 1) {
			// server.channels.cache.get('687445302755721289').send('**' + member.user.username + '**, joinede serveren ' + server.name);
		}
		else if (status === 0) {
			// server.channels.cache.get('687445302755721289').send('**' + member.user.username + '**, leavede serveren ' + server.name);
		}
	},
};
