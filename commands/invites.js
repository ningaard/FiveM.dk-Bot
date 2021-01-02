var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'invites',
	description: 'Viser antallet af invites en har',
	async execute(message, args) {

		var user = message.author;

			 message.guild.fetchInvites()
			 .then

			 (invites =>
					 {
							 const userInvites = invites.array().filter(o => o.inviter.id === user.id);
							 var userInviteCount = 0;
							 for(var i=0; i < userInvites.length; i++)
							 {
									 var invite = userInvites[i];
									 console.log(invite)
									 userInviteCount += invite['uses'];
							 }
										message.reply(`Du har inviteret ${userInviteCount} folk.`);
					 }
			 )








	},
};
