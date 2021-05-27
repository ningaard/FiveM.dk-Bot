const disbut = require('discord-buttons');
const Discord = require('discord.js')
const config = require("../config.json");
module.exports = {
	name: 'opretticket',
	description: 'Brug den her i "Opret ticket" kanalen!',
	async execute(message, args, con) {
		if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		  if(message.member.roles.cache.some(r => r.name === "Manager") ) {

				const embed = new Discord.MessageEmbed();
				embed.setTitle("Opret en ticket")
				embed.setAuthor("FiveM.dk")
				embed.setDescription("Hvis du har et spørgsmål som ikke kan besvares i nogle af vores andre kanaler, f.eks udvikler, skinner chatten, så kan du med fordel oprette en ticket. Tickets er ikke til forespørgsler for hjælp til server udvikling, og lign.")
				embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');

				let btn = new disbut.MessageButton()
			          .setStyle('green') //default: blurple
			          .setLabel('Opret ticket') //default: NO_LABEL_PROVIDED
			          .setID('open_ticket') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
			          // .setDisabled(); //disables the button | default: false

			        await message.channel.send('', { button: btn, embed: embed });
			}
	},
};
