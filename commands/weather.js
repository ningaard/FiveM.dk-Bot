const fetch = require("node-fetch");

module.exports = {
	name: 'weather',
	aliases: ['vejr'],
	description: 'Sender vejr!',
	async execute(message, args, con) {
		const location = args.join(" ");
    const url = "https://vejr.eu/api.php?location=" + location + "&degree=C";
 const getData = async url => {
   const response = await fetch(url);
   var json = await response.json();
    message.channel.send({embed: {
    color: 3447003,
    title: "Vejret",
    description: json['LocationName'],
    fields: [{
        name: "Temperatur",
        value: json['CurrentData']['temperature']
      },
      {
        name: "Vejrsituation",
        value: json['CurrentData']['skyText']
      },
      {
        name: "Vind",
        value: json['CurrentData']['windText']
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Vejrudsigt fra Vejr.eu"
    }
  }
    });
  };
  getData(url, 0);
	},
};
