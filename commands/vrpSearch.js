var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'vrp',
	description: 'Tjekker databasen for info omkring et vRP user_id',
	async execute(message, args) {

    const id = args.join(" ");


        if (id.length !== 0) {


          con.connect(function(err) {
            con.query("SELECT * FROM vrp_users WHERE id = '"+id+"'", function (err, result, fields) {
              if (typeof result[0] !== "undefined") {
                // message.channel.send("her kommer der info om id: " + id)

								const embed = new Discord.MessageEmbed();
									embed.setTitle("vRP User Info")
									embed.setAuthor("ID: " + id)


									embed.setColor(0x00AE86)
									embed.addField("Sidst inde", result[0]['last_date'], false)
									embed.addField("Whitelisted", result[0]['whitelisted'], false)
									embed.addField("Bannet", result[0]['banned'], false)
									if (result[0]['banned'] == 1) {
									embed.addField("Ban grund", result[0]['ban_reason'], false)
									}

									embed.setFooter('FiveM Bot - https://github.com/Lassemc475/FiveM-bot');

									message.channel.send({embed});

              }
              else {
                  message.channel.send("ID'et kunne ikke findes.")
              }

            });
          });

        }
        else {
          message.channel.send("Du har ikke angivet et ID der skal søges efter")
        }



    },
};
