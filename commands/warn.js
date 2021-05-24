const Discord = require("discord.js");
var con = require('../database');

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
   return result.join('');
}

module.exports = {
	name: 'warn',
	description: 'Warner en person',
	async execute(message, args, member) {

        let id = makeid(9)

        function viewwarns(brugerid, message){
            con.query(`SELECT warns.*, DATE_FORMAT(warns.time, '%d/%m-%Y %H:%i') AS 'timestamp' FROM warns WHERE userid = ?`, [brugerid], (err, row) => {
                if (err) throw err;
                if(row[0]) {
                    const fields = row.map((warns) => {
                        return {
                            name: warns.reason,
                            value: "Givet af: " + warns.author + " | Dato: " + warns.timestamp + " | Warn ID: " + warns.nr + ""
                        }
                    })
                    const embed = {
                        author: {
                            name: "Advarsler for " + bruger.user.tag
                        },
                        fields: fields,
                        color: ('#00ff00')
                    };
                    message.channel.send({embed: embed});
                } else {
                    message.channel.send("Ingen warns på denne person");
                }
            });
        }

        function givewarn(brugerid, author, reason) {
            con.query(`SELECT * FROM warns WHERE userid = ?`, [brugerid], (err, row) => {
                if (err) throw err;
                    con.query(`SELECT * FROM warns WHERE userid = ?`, [brugerid], (err1, row1) => {
                        if (err1) throw err;
                            con.query(`INSERT INTO warns (userid, reason, author, authorid, nr) VALUES (?,?,?,?,?)`,
                            [brugerid, reason, warner, warnerid, id])
                    });
            });
        }

         function removewarn(nr) {
            con.query(`SELECT * FROM warns WHERE nr = ?`, [nr], (err, row) => {
                if (err) throw err;
                if(row[0]) {
                    con.query(`DELETE FROM warns WHERE nr = ?`, [nr])
                    let remembed = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(`Warning fjernet | ${message.guild.name}`)
                    .setDescription(`**Du har fået fjernet følgende warning!**\n${row[0].reason}\n\n**Din warning blev fjernet af:** ${message.author.username}\n\n**Warn ID:** ${row[0].nr}`)
                    .setFooter(`Lavet af Ezague#0020`)
                    let warnmedlem = row[0].userid;
                    console.log(warnmedlem)
                    message.guild.members.fetch(warnmedlem, false).then((user) => {
                       user.send(remembed);
                      });
                } else {
                    message.channel.send(`Nummeret ${nr} findes ikke.`);
                }
            });
        }

        if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")
        //if(!message.bruger.roles.cache.some(r => r.name === "Moderator") || !message.bruger.roles.cache.some(r => r.name === "Manager") ) return;
        const warner = message.author.username;
        const warnerid = message.author.id;
        const bruger = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let brugerid = null;
        if (bruger) {
            brugerid = bruger.id;
        };

        switch(args[0]){
            case "se":
                viewwarns(brugerid, message)
                break;
            case "giv":
                const reason = args.splice(2).join(" ");
                if (!reason) return;
                givewarn(brugerid, warner, reason)
                let embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`Warning | ${message.guild.name}`)
                .setDescription(`**Du har fået en advarsel med følgende grundlag:**\n${reason}\n\n**Du blev warned af:** ${warner}\n**Warn ID:** ${id}`)
                .setFooter(`Lavet af Ezague#0020`)
                bruger.send(embed);
                break;
            case "fjern":
                removewarn(args[1])
                break;
            default:
                break;
        }

        message.delete();
    },
};
