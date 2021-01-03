const Discord = require('discord.js')
const fetch = require("node-fetch");
var fs = require('fs');
var con = require('./database');
var api = require('./api');
const client = new Discord.Client();
const config = require("./config.json");
var events = require('./handlers/events')(client);

client.on('ready', async () => {
	client.events.get('ready').execute(client)
});

client.on("message", async message => {
	client.events.get('message').execute(message)
})

client.on('messageReactionAdd', (reaction, user) => {
	client.events.get('createTicket').execute(reaction, user)
});

client.on('guildMemberAdd', member => {
	client.events.get('guildMemberUpdate').execute(member, 1, client)
})

client.on('guildMemberRemove', member => {
		client.events.get('guildMemberUpdate').execute(member, 0, client)
});

client.login(config.token)
