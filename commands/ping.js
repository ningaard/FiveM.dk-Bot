module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message, args, con) {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Ping er: ${m.createdTimestamp - message.createdTimestamp} ms.`);
	},
};
