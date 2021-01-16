var parseString = require('xml2js').parseString;
var config = require('./config.json');
const axios = require('axios').default;
var con = require('./database');
var def = require('./defender');
const Discord = require('discord.js')
const client = new Discord.Client();
const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()
const port = 80
var path = require('path');
var events = require('./handlers/events')(client);

client.on('ready', () => {
	console.log("API kan tage Discord kald")
});
client.login(config.token)


app.use(express.static(__dirname + '/partials'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  con.query("SELECT * FROM servers WHERE active = 1 ORDER BY points ASC", function (err, result, fields) {
    res.render('index', {title: 'title', result: result});
  })
});

app.get('/server/:server', function (req, res) {
  var server = req.params.server
  con.query("SELECT * FROM servers WHERE ip = ?", [server], function (err, result, fields) {
    res.render('server', {title: 'title', result: result});
  })
});

app.get('/docs', function (req, res) {
  var server = req.params.server
  res.render('docs', {title: 'title'});
});

app.get('/discord', function(req, res) {
  res.redirect('https://discord.gg/DTqjKbR');
});

app.get('/api/:server', function (req, res) {
  var server = req.params.server
  con.query('SELECT count(server) as total FROM votes WHERE server = "'+server+'"', function (err, result, fields) {
    con.query('SELECT count(server) as today FROM votes WHERE curdate = CURDATE() AND server = "'+server+'"', function (err, result2, fields) {
      con.query('SELECT count( DISTINCT(ip) ) as ips FROM votes WHERE server = "'+server+'"', function (err, result3, fields) {
        con.query('SELECT sum(clients) as clients FROM servers WHERE ip = "'+server+'"', function (err, result4, fields) {
          con.query('SELECT sum(max) as max FROM servers WHERE ip = "'+server+'"', function (err, result5, fields) {
            con.query('SELECT name FROM servers WHERE ip = "'+server+'"', function (err, result6, fields) {

              res.json({result, result2, result3, result4, result5, result6})
            })
          })
        })
      })
    })
  })

})


app.get('/api', function (req, res) {
  con.query('SELECT count(server) as total FROM votes', function (err, result, fields) {
    con.query('SELECT count(server) as today FROM votes WHERE curdate = CURDATE()', function (err, result2, fields) {
      con.query('SELECT count( DISTINCT(ip) ) as ips FROM votes', function (err, result3, fields) {
        con.query('SELECT sum(clients) as clients FROM servers', function (err, result4, fields) {
          con.query('SELECT sum(max) as max FROM servers', function (err, result5, fields) {
          result6 = [{'name':'FiveM.dk'}]

            res.json({result, result2, result3, result4, result5, result6})
          })
        })
      })
    })
  })

})

app.get('/getUser/:identifier', function (req, res) {
  var identifier = req.params.identifier
  axios.defaults.headers.common['Authorization'] = "Bot "+config.token;
  axios.get(`https://discordapp.com/api/users/${identifier}`)
  .then(function (response) {
    res.json(response['data'])
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });

})

app.get('/vote/:server', function (req, res) {
  var server = req.params.server
  ipa = req.connection.remoteAddress
  ip = ipa.replace("::ffff:", "")
  con.query(`SELECT * FROM votes WHERE ip = ? AND curdate = CURDATE()`, [ip], function (err, result, fields) {
    if (!result[0]) {
      con.query(`INSERT INTO votes (ip, server, curdate)
              VALUES ('${ip}', '${server}', CURDATE())`, function (err, result, fields) {
        con.query(`UPDATE servers SET points=points+1 WHERE ip='${server}'`, function (err, result, fields) {

          res.json(result)

        })
      })
    }
  })

})


app.get('/defender/single/:identifier', function (req, res) {
  var identifier = req.params.identifier
  checks = ['steam_id', 'xbox_id', 'live_id', 'license_id', 'discord_id'];
  try {
    def.query(`SELECT * FROM moddersteam WHERE ${checks[0]} = '${identifier}'
    OR ${checks[1]} = '${identifier}'
    OR ${checks[2]} = '${identifier}'
    OR ${checks[3]} = '${identifier}'
    OR ${checks[4]} = '${identifier}'`, function (err, result, fields) {
      if (typeof result == "undefined") return res.json({'status': 'not found'})
      if (typeof result[0] !== "undefined") {
        // res.json(result)
        res.json({ 'status': 'found' })
      }
      else {
        res.json({ 'status': 'not found' })
      }
    })
  } catch (e) {
    console.log(e)
  }

});

app.get('/defender/all', function (req, res) {
  try {
    def.query("SELECT * FROM moddersteam", function (err, result, fields) {
      res.json(result)
    })
  } catch (e) {
    console.log(e)
  }
});

app.get('/defender/version', function (req, res) {
  try {
    res.send("1.2")
  } catch (e) {
    console.log(e)
  }
});

app.post('/webhook/:hook/:message', function (req, res) {
  var message = req.params.message
  client.events.get('webhook').execute(client, message)
  res.send(message)
  // client.guilds.get('621288307099303966').channels.get('687445302755721289').send("Message");
})

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
});

app.listen(port, () => {
  console.log(`API'en køre på http://fivem.dk:${port}`)
})

const privateKey = fs.readFileSync('/etc/letsencrypt/live/fivem.dk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/fivem.dk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/fivem.dk/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
	console.log('HTTPS serveren er startet.');
});
