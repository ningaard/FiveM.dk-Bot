const Discord = require('discord.js')
var con = require('../database');
const config = require("../config.json");
const client = new Discord.Client();
var commands = require('../handlers/commands')(client);


module.exports = {
	name: 'buttons',
	async execute(button, disbut) {
		if (button.id === 'open_ticket') {
	    // button.channel.send(`${button.clicker.user.tag} clicked button!`);
			console.log(button.message)
			con.query(`SELECT * FROM discords WHERE guild = ${button.message.guild.id}`, function (err, result, fields) {
				if (typeof result[0] !== "undefined") {
					const ticketCategory = result[0]['ticketCategory'];

					num = Math.floor(Math.random() * 1000000)

					button.message.guild.channels.create(num, "text").then((channel) => {

							channel.setParent(ticketCategory).then((parent) => {


								let role = button.message.guild.roles.cache.find(r => r.name === "@everyone");
								let moderator = button.message.guild.roles.cache.find(r => r.name === ""+result[0]['role']+"");
								// console.log(result[0]['role'])
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
										id: button.clicker.user.id,
										allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES'],
									}

								]);



									var embed = new Discord.MessageEmbed()
											.setTitle("Hej!")
											.setDescription("Stil dit spørgsmål her.");

											let btn = new disbut.MessageButton()
															.setStyle('red') //default: blurple
															.setLabel('Luk ticket') //default: NO_LABEL_PROVIDED
															.setID('close_ticket') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
															// .setDisabled(); //disables the button | default: false

														parent.send('', { button: btn, embed: embed });

									// parent.send(embed);
									// message.reactions.resolve("✉️").users.remove(user);
							}).catch(err => {
								console.log(err)
									// message.channel.send("Der skete en fejl");
							});

					}).catch(err => {
							// message.channel.send("Der skete en fejl");
					});

			}
		})
	  }
		if (button.id === 'close_ticket') {
			// if (!button.clicker.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Det må du ikke det der")

			guild = button.message.guild.id
				con.query(`SELECT ticketCategory from discords WHERE guild = ${guild}`, function (err, result, fields) {
					if (typeof result[0] !== "undefined") {
						const categoryId = result[0]['ticketCategory']; //gør så man kun kan lukke tickets i den category som tickets bliver oprettet i

					  if (button.message.channel.parentID == categoryId) {

					    button.message.channel.delete();
					    var embed = new Discord.MessageEmbed();
					      embed.setTitle("Ticket: " + button.message.channel.name)
					      embed.setDescription(
					        `Ticket: ${button.message.channel.name} blev afsluttet af ${button.clicker.user.tag}.`
					      )
					      embed.setTimestamp();

					    const logChannel = button.guild.channels.cache.find(channel => channel.name === "logs")
					    if (!logChannel)
					      return button.message.channel.send("Kan ikke finde log kanalen");
					    logChannel.send(embed);
					  } else {
					    return button.message.channel.send("Denne kanal er ikke i ticket kategorien.")
					  }
					}
				})
		}

		//Tildel rolle funktion
		if (button.id === 'dev_rankAdd') {
			await button.clicker.member.roles.add("663369657150865440").catch(e => {})
      await button.reply.send('Rollen **Udvikler** blev tildelt', true);
		}
		if (button.id === 'mapping_rankAdd') {
			await button.clicker.member.roles.add("736905737082634253").catch(e => {})
      await button.reply.send('Rollen **Mapping** blev tildelt', true);
		}
		if (button.id === 'skinner_rankAdd') {
			await button.clicker.member.roles.add("662377187034398720").catch(e => {})
      await button.reply.send('Rollen **Skinner** blev tildelt', true);
		}
		if (button.id === 'grafiker_rankAdd') {
			await button.clicker.member.roles.add("661910897878368266").catch(e => {})
      await button.reply.send('Rollen **Grafiker** blev tildelt', true);
		}
		if (button.id === 'botdev_rankAdd') {
			await button.clicker.member.roles.add("834887706542473236").catch(e => {})
      await button.reply.send('Rollen **Bot udvikler** blev tildelt', true);
		}



		//Fjern rolle funktion
		if (button.id === 'dev_rankRemove') {
			await button.clicker.member.roles.remove("663369657150865440").catch(e => {})
      await button.reply.send('Rollen **Udvikler** blev fravalgt', true);
		}
		if (button.id === 'mapping_rankRemove') {
			await button.clicker.member.roles.remove("736905737082634253").catch(e => {})
      await button.reply.send('Rollen **Mapping** blev fravalgt', true);
		}
		if (button.id === 'skinner_rankRemove') {
			await button.clicker.member.roles.remove("662377187034398720").catch(e => {})
      await button.reply.send('Rollen **Skinner** blev fravalgt', true);
		}
		if (button.id === 'grafiker_rankRemove') {
			await button.clicker.member.roles.remove("661910897878368266").catch(e => {})
      await button.reply.send('Rollen **Grafiker** blev fravalgt', true);
		}
		if (button.id === 'botdev_rankRemove') {
			await button.clicker.member.roles.remove("834887706542473236").catch(e => {})
      await button.reply.send('Rollen **Bot udvikler** blev fravalgt', true);
		}
	},
};
