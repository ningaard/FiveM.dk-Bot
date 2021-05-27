const disbut = require('discord-buttons');
const Discord = require('discord.js')
const config = require("../config.json");
module.exports = {
	name: 'roles',
	description: 'Brug den her i "roller" kanalen!',
	async execute(message, args, con) {
		if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		  if(message.member.roles.cache.some(r => r.name === "Manager") ) {

				const embed = new Discord.MessageEmbed();
				embed.setTitle("Tilvælg roller")
				embed.setAuthor("FiveM.dk")
				embed.setDescription("Vælg de roller du vil ha' tildelt")
				// embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');

				//Giv rolle knapper
				let btn = new disbut.MessageButton()
			     .setStyle('green')
			     .setLabel('Udvikler 🛠️')
			     .setID('dev_rankAdd')
				let btn2 = new disbut.MessageButton()
						.setStyle('green')
						.setLabel('Mapping 🏗️️')
						.setID('mapping_rankAdd')
 				let btn3 = new disbut.MessageButton()
 						.setStyle('green')
 						.setLabel('Skinner 🏡️')
 						.setID('skinner_rankAdd')
 				let btn4 = new disbut.MessageButton()
 						.setStyle('green')
 						.setLabel('Grafiker 🎑️')
 						.setID('grafiker_rankAdd')
 				let btn5 = new disbut.MessageButton()
 						.setStyle('green')
 						.setLabel('Bot udvikler 🤖️')
 						.setID('botdev_rankAdd')


						const aembed = new Discord.MessageEmbed();
						aembed.setTitle("Fjern roller")
						// aembed.setAuthor("FiveM.dk")
						aembed.setDescription("Vælg de roller du vil ha' fjernet")
						aembed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');

						//Fjern rolle knapper
						let abtn = new disbut.MessageButton()
					     .setStyle('red')
					     .setLabel('Udvikler 🛠️')
					     .setID('dev_rankRemove')
						let abtn2 = new disbut.MessageButton()
								.setStyle('red')
								.setLabel('Mapping 🏗️️')
								.setID('mapping_rankRemove')
		 				let abtn3 = new disbut.MessageButton()
		 						.setStyle('red')
		 						.setLabel('Skinner 🏡️')
		 						.setID('skinner_rankRemove')
		 				let abtn4 = new disbut.MessageButton()
		 						.setStyle('red')
		 						.setLabel('Grafiker 🎑️')
		 						.setID('grafiker_rankRemove')
		 				let abtn5 = new disbut.MessageButton()
		 						.setStyle('red')
		 						.setLabel('Bot udvikler 🤖️')
		 						.setID('botdev_rankRemove')




			        await message.channel.send('', { buttons: [btn, btn2, btn3, btn4, btn5], embed: embed });
							await message.channel.send('', { buttons: [abtn, abtn2, abtn3, abtn4, abtn5], embed: aembed });
			}
	},
};
