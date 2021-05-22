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
const http = require('http')
const app = express()
const port = 80
var path = require('path');
var events = require('./handlers/events')(client);
const iplocate = require("node-iplocate");
const btoa = require('btoa');
const fetch = require('node-fetch');

// client.on('ready', () => {
// 	console.log("API kan tage Discord kald")
// });
// client.login(config.token)


app.use(express.static(__dirname + '/partials'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(function(request, response, next) {
//
//     if (process.env.NODE_ENV != 'development' && !request.secure) {
//        return response.redirect("https://" + request.headers.host + request.url);
//     }
//
//     next();
// })

app.get('/', function (req, res) {

  // const nolife = axios.get('https://brosboel-275elr.users.cfx.re/dynamic.json');
  // online = nolife['data']['Data']['clients'];
  // max = nolife['data']['Data']['sv_maxclients'];
  // con.query(`UPDATE servers SET clients=${clients}, max=${max} WHERE name='NoLifeRP'`, function (err, result, fields) {
  //
  //
  //
  // })

  axios.get(`https://brosboel-275elr.users.cfx.re/dynamic.json`)
  .then(function (nolife) {
    online = nolife['data']['clients'];
    max = nolife['data']['sv_maxclients'];
    con.query(`UPDATE servers SET clients=${online}, max=${max} WHERE name='NoLifeRP'`, function (err, result, fields) {

      axios.get(`https://danishrp.dk/status`)
      .then(function (nolife) {
        online = nolife['data']['clients'];
        max = nolife['data']['maxClients'];
        con.query(`UPDATE servers SET clients=${online}, max=${max} WHERE name='DanishRP'`, function (err, result, fields) {



        })
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });

    })
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });

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

app.get('/shop', function (req, res) {
  con.query("SELECT * FROM shop", function (err, result, fields) {
    res.render('shop', {title: 'title', result: result});
  })
});

app.get('/shop/:name', function (req, res) {
  var shop = req.params.server
  con.query("SELECT * FROM shop WHERE name = ?", [shop], function (err, result, fields) {
    res.render('shops', {title: 'title', result: result});
  })
});

app.get('/discord', function(req, res) {
  res.redirect('https://discord.gg/DTqjKbR');
});

app.get('/api/v1/:server', function (req, res) {
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


app.get('/api/v1', function (req, res) {
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



app.get('/api/v2', function (req, res) {
  con.query('SELECT count(server) as total FROM votes', function (err, result, fields) {
    con.query('SELECT count(server) as today FROM votes WHERE curdate = CURDATE()', function (err, result2, fields) {
      con.query('SELECT count( DISTINCT(ip) ) as ips FROM votes', function (err, result3, fields) {
        con.query('SELECT sum(clients) as clients FROM servers', function (err, result4, fields) {
          con.query('SELECT sum(max) as max FROM servers', function (err, result5, fields) {
          result6 = [{'name':'FiveM.dk'}]

          json = [{'total' : result[0]['total']},
                  {'today' : result2[0]['today']},
                  {'voters' : result3[0]['ips']},
                  {'clients' : result4[0]['clients']},
                  {'max' : result5[0]['max']},
                  {'name' : 'FiveM.dk'}
                  ]
            res.json(json)
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


  // iplocate(ip).then(function(results) {

  //   if (results.country === "Denmark") {

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
  //   }
  // })


})

app.get('/setClients/:server/:clients', function (req, res) {
  var server = req.params.server
  var clients = req.params.clients

  con.query(`UPDATE servers SET clients=${clients} WHERE ip='${server}'`, function (err, result, fields) {



  })


})


app.get('/defender/single/:identifier', function (req, res) {
  var identifier = req.params.identifier
  checks = ['steam_id', 'xbox_id', 'live_id', 'license_id', 'discord_id'];
  try {
		def.connect(function(err) {
	    def.query(`SELECT * FROM moddersteam WHERE ${checks[0]} = '${identifier}'
	    OR ${checks[1]} = '${identifier}'
	    OR ${checks[2]} = '${identifier}'
	    OR ${checks[3]} = '${identifier}'
	    OR ${checks[4]} = '${identifier}'`, function (err, result, fields) {
	      if (typeof result == "undefined") return res.json({'status': 'not found'})
	      if (typeof result[0] !== "undefined") {
	        res.json({ 'status': 'found' })
	      }
	      else {
	        res.json({ 'status': 'not found' })
	      }
	    })
		})
  } catch (e) {
    console.log(e)
  }
});


let bannedModders = ""
function refreshCache() {
    def.query("SELECT steam_id, xbox_id, license_id, license2_id, discord_id FROM moddersteam", function (err, result, fields) {
        bannedModders = result
    })
    setTimeout(() => {
        refreshCache();
    }, 10*60*1000);
}
refreshCache();


app.get('/defender/all', function (req, res) {
    try {
        res.json(bannedModders)
    } catch (e) {
        res.json([])
    }
});


// app.get('/defender/all', function (req, res) {
//   try {
// 		def.connect(function(err) {
// 	    def.query("SELECT * FROM moddersteam", function (err, result, fields) {
// 	      res.json(result)
// 	    })
// 		})
//   } catch (e) {
//     console.log(e)
//   }
// });


app.get('/defender/ip/:ip', function (req, res) {
  var ip = req.params.ip
  try {

		def.connect(function(err) {
	    def.query(`SELECT * FROM wlip WHERE ip = '${ip}'`, function (err, result, fields) {
	      if (typeof result == "undefined") return res.json({'status': 'not found'})
	      if (typeof result[0] !== "undefined") {
	        // res.json(result)
	        res.json({ 'status': 'found' })
	      }
	      else {
	        res.json({ 'status': 'not found' })
	      }
	    })
		})
  } catch (e) {
    console.log(e)
  }

});

//
// app.get('/defender/report/:name/:steam/:license/:live/:xbl/:discord/:proof', function (req, res) {
//   var name = req.params.name
//   var steam = req.params.steam
//   var license = req.params.license
//   var live = req.params.live
//   var xbl = req.params.xbl
//   var discord = req.params.discord
//   var proof = req.params.proof
//
//   try {
// 		def.connect(function(err) {
//       var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//       def.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//       });
// 		})
//   } catch (e) {
//     console.log(e)
//   }
// });

app.get('/defender/version', function (req, res) {
  try {
    res.send("1.4")
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



app.get('/.well-known/acme-challenge/eQewD_1uwrHZda3vqqoDE3vfjYhxrdlhFXrpG5xkIJI', function (req, res) {
  try {
    res.send("eQewD_1uwrHZda3vqqoDE3vfjYhxrdlhFXrpG5xkIJI.52NmwfckutoInMF1FdB1HlMH2Gs-s48c1Op4N7fh9Qo")
  } catch (e) {
    console.log(e)
  }
});

// app.listen(port, () => {
//   console.log(`API'en køre på http://fivem.dk:${port}`)
// })

const privateKey = fs.readFileSync('cert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert/cert.pem', 'utf8');
const ca = fs.readFileSync('cert/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// var options = {
//   key: fs.readFileSync('ssl/key.pem'),
//   cert: fs.readFileSync('ssl/certificate.pem')
// };
// const httpsServer = https.createServer(options, app);

// const httpsServer = https.createServer(credentials, app);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
