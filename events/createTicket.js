const Discord = require('discord.js')
var con = require('../database');

module.exports = {
	name: 'createTicket',
	async execute(reaction, user) {
		        let message = reaction.message, emoji = reaction.emoji;
						console.log(user)
						if (user.bot) return;
						// console.log(message.channel.name)
						if (message.channel.name == "opret-ticket") {

		        	if (emoji.name == '✉️') {
								con.query(`SELECT * FROM discords WHERE guild = ${message.guild.id}`, function (err, result, fields) {
									if (typeof result[0] !== "undefined") {
										const ticketCategory = result[0]['ticketCategory'];

								    num = Math.floor(Math.random() * 1000)

								    message.guild.channels.create(user.username + "-"+num, "text").then((channel) => {

								        channel.setParent(ticketCategory).then((parent) => {


													let role = message.guild.roles.cache.find(r => r.name === "@everyone");
													let moderator = message.guild.roles.cache.find(r => r.name === ""+result[0]['role']+"");
													console.log(result[0]['role'])
													channel.overwritePermissions([
														{
															type: 'role',
												        id: role.id,
												        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
												    },
														{
															type: 'role',
													    id: moderator.id,
													    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
													  },
														{
															id: user.id,
															allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES'],
														}

													]);



								            var embed = new Discord.MessageEmbed()
								                .setTitle("Hej!")
								                .setDescription("Stil dit spørgsmål her.");

								            parent.send(embed);
														message.reactions.resolve("✉️").users.remove(user);
								        }).catch(err => {
													console.log(err)
								            message.channel.send("Der skete en fejl");
								        });

								    }).catch(err => {
								        message.channel.send("Der skete en fejl");
								    });

								}
							})
			        }
						}

		        // Remove the user's reaction

	},
};
