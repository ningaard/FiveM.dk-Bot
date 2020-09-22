var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')

module.exports = {
	name: 'userinfo',
  aliases: ["ui", "user", "info"],
	description: 'Viser userinfo om en person',
	async execute(message, args) {



        uiName = message.author.tag;
        let member = message.mentions.members.first() || message.member,
        user = member.user;
        uiRoles = member.roles.cache.map(r => `${r}`).join(' | ');
        uiDiscordJoin = moment(user.createdTimestamp).format("DD/MM/YYYY");
        uiCNJoin = moment(user.joinedTimestamp).format("DD/MM/YYYY");
        joinedGangGang = moment.utc(member.joinedAt).format('DD/MM/YYYY');
        guild = message.guild.name



			const embed = new Discord.MessageEmbed();
				embed.setTitle("User info")
				embed.setAuthor(user.username)


				embed.setColor(0x00AE86)
				embed.addField("Joinede Discord", uiDiscordJoin, false)
				embed.addField("Joinede " + guild, joinedGangGang, false)

				embed.addField("Roller", uiRoles, false)
				embed.setFooter('FiveM Bot - https://github.com/Lassemc475/FiveM-bot');

				message.channel.send({embed});







	},
};
